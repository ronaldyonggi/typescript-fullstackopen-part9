import diagnoses from '../../data/diagnoses';

import { Diagnosis } from '../utils/types';

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
