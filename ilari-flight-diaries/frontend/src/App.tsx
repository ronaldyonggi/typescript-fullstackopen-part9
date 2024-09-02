import { useEffect, useState } from 'react';
import { DiaryEntry } from './utils/types';
import axios from 'axios';
import Entry from './components/Entry';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios
      .get<DiaryEntry[]>('http://localhost:3000/api/diaries')
      .then(({ data }) => setDiaries(data));
  }, []);

  return (
    <>
      <h1>Diary Entries</h1>
      {diaries.map((d) => (
        <Entry key={d.id} entry={d} />
      ))}
    </>
  )
}

export default App;
