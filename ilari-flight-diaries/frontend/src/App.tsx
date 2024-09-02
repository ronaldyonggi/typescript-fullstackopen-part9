import { useEffect, useState } from 'react';
import { DiaryEntry } from './utils/types';
import Entry from './components/Entry';
import diaryService from './services/diaryService';
import NewEntryForm from './components/NewEntryForm';
import Notification from './components/Notification';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState<string>('');

  const fetchEntries = async () => {
    const allEntries = await diaryService.getNonSensitiveEntries();
    setEntries(allEntries);
  };

  const showErrorHelper = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <>
      <h2>Add new entry</h2>
      <Notification message={notification} />
      <NewEntryForm entries={entries} setEntries={setEntries} showErrorHelper={showErrorHelper} />
      <h2>Diary Entries</h2>
      {entries.map((e) => (
        <Entry key={e.id} entry={e} />
      ))}
    </>
  );
}

export default App;
