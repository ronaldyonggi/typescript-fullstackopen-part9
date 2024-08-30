import patients from '../../data/patients';
import { NewPatient, NonSensitivePatient, Patient } from '../utils/types';
import { v1 as uuid } from 'uuid';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (object: NewPatient): Patient => {
  const newPatientObject = {
    id: uuid(),
    ...object,
  };

  patients.push(newPatientObject);
  return newPatientObject;
};

export default {
  getNonSensitivePatients,
  addPatient,
};
