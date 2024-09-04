import { Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

interface PatientPageProps {
  patient: Patient;
}

export default function PatientPage({ patient }: PatientPageProps) {
  return (
    <>
      <h3>
        {patient.name}
        {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
      </h3>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
    </>
  );
}
