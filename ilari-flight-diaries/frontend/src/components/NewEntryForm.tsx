import { useState } from 'react';
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from '../utils/types';
import diaryService from '../services/diaryService';
import RadioSelection from './RadioSelection';

interface NewEntryFormProps {
  entries: DiaryEntry[];
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  showErrorHelper: (message: string) => void;
}

export default function NewEntryForm({
  entries,
  setEntries,
  showErrorHelper,
}: NewEntryFormProps) {
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<Visibility | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [comment, setComment] = useState<string>('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!(date && visibility && weather)) {
      showErrorHelper('Not all fields are filled!');
      return;
    }

    const newEntry: NewDiaryEntry = {
      date,
      visibility,
      weather,
      comment,
    };

    try {
      const createdEntry = await diaryService.createEntry(newEntry);
      if (createdEntry) {
        setEntries(entries.concat(createdEntry));
      }
      setDate('');
      setVisibility(null);
      setWeather(null);
      setComment('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        showErrorHelper(error.message);
      }
    }
  };
  return (
    <>
      <h3>Add new entry</h3>
      <form onSubmit={onSubmit}>
        Date:
        <input
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div>
          Visibility:
          <RadioSelection
            enumType={Weather}
            name='weather'
            setter={setWeather}
          />
        </div>
        <div>
          Weather:
          <RadioSelection
            enumType={Visibility}
            name='visibility'
            setter={setVisibility}
          />
        </div>
        <div>
          Comment:
          <input
            type='text'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type='submit'>Add</button>
      </form>
    </>
  );
}
