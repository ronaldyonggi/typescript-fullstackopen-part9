import { DiaryEntry } from '../utils/types';

interface EntryProps {
  entry: DiaryEntry;
}

export default function Entry({ entry }: EntryProps) {
  return (
    <div>
      <p>
        <b>{entry.date}</b>
      </p>
      <p>visibility: {entry.visibility}</p>
      <p>weather: {entry.weather}</p>
      <p>{entry.comment}</p>
    </div>
  );
}
