import {
  NewEntry,
  NewEntrySchema,
  NewPatient,
  NewPatientSchema,
} from './types';

export const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

export const toNewEntry = (object: unknown): NewEntry => {
  return NewEntrySchema.parse(object);
};
