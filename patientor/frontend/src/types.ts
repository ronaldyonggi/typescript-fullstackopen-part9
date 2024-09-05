// export interface Diagnosis {
//   code: string;
//   name: string;
//   latin?: string;
// }

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

// export interface Patient {
//   id: string;
//   name: string;
//   occupation: string;
//   gender: Gender;
//   ssn?: string;
//   dateOfBirth?: string;
// }

const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string().datetime(),
  specialist: z.string(),
  diagnosisCodes: z.array(DiagnosisSchema.shape.code).optional(),
});

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.number(),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().datetime(),
      endDate: z.string().datetime(),
    })
    .optional(),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z
    .object({
      date: z.string().datetime(),
      criteria: z.string(),
    })
    .optional(),
});

const EntrySchema = z.discriminatedUnion('type', [
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema,
]);

export type Entry = z.infer<typeof EntrySchema>;

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(EntrySchema),
});

const PatientSchema = NewPatientSchema.extend({
  id: z.string(),
});

export type Patient = z.infer<typeof PatientSchema>;

const PatientFormValuesSchema = NewPatientSchema.omit({ entries: true });

export type PatientFormValues = z.infer<typeof PatientFormValuesSchema>;

// export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;
