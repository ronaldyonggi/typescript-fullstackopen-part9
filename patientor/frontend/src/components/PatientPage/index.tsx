import { Diagnosis, Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EntryComponent from './EntryComponent';

interface PatientPageProps {
  patient: Patient;
  diagnoses: Diagnosis[];
}

export default function PatientPage({ patient, diagnoses }: PatientPageProps) {
  return (
    <>
      <h3>
        {patient.name}
        {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
      </h3>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      {patient.entries.map((entry) => (
        <EntryComponent key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </>
  );
}
