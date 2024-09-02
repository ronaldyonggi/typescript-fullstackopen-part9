import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../utils/types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getNonSensitiveEntries = async () => {
  const { data } = await axios.get<DiaryEntry[]>(baseUrl);
  return data;
};

const createEntry = async (object: NewDiaryEntry) => {
  try {
    const { data } = await axios.post<DiaryEntry>(baseUrl, object);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
  }
};

export default {
  getNonSensitiveEntries,
  createEntry,
};
