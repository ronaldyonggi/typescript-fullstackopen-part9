import patients from '../../data/patients';
import {
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from '../utils/types';
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

const getPatient = (id: string): Patient => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    throw new Error('Patient not found');
  }
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

const addEntry = (id: string, entry: NewEntry): Patient => {
  const patient = patients.find((p) => p.id === id);
  if (patient) {
    const newEntry = {
      id: uuid(),
      ...entry,
    };
    patient.entries.push(newEntry);
    return patient;
  } else {
    throw new Error('Patient not found');
  }
};

export default {
  getAllNonSensitivePatients,
  addPatient,
  getPatient,
  getAllPatients,
  addEntry,
};
