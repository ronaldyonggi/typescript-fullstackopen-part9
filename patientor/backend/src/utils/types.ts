import { z } from 'zod';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

const DiagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

export type Diagnosis = z.infer<typeof DiagnosisSchema>;

const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string().datetime(),
  specialist: z.string(),
  diagnosisCodes: z.array(DiagnosisSchema.shape.code).optional(),
});

export type NewPatient = z.infer<typeof NewPatientSchema>;
export interface Patient extends NewPatient {
  id: string;
}
export type NonSensitivePatient = Omit<Patient, 'ssn'>;
