import patients from '../../data/patients';
import { NewPatient, NonSensitivePatient, Patient } from '../utils/types';
import { v1 as uuid } from 'uuid';

const getAllPatients = (): Patient[] => {
  return patients;
};

const getAllNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
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
  getAllNonSensitivePatients,
  addPatient,
  getPatient,
  getAllPatients
};
