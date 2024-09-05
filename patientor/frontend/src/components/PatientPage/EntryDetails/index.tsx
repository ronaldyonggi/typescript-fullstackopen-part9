import { assertNever, Diagnosis, Entry } from '../../../types';
import './index.css';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

interface display {
  icon: JSX.Element | null;
  employer?: string;
  heart?: JSX.Element | null;
}

export default function EntryDetails({ entry, diagnoses }: EntryProps) {
  const display: display = { icon: null, heart: null };
  switch (entry.type) {
    case 'HealthCheck':
      display.icon = <MedicalServicesIcon />;
      switch (entry.healthCheckRating) {
        case 0:
          display.heart = <FavoriteIcon style={{ color: 'green' }} />;
          break;
        case 1:
          display.heart = <FavoriteIcon style={{ color: 'yellow' }} />;
          break;
        case 2:
          display.heart = <FavoriteIcon style={{ color: 'red' }} />;
          break;
        case 3:
          display.heart = <FavoriteIcon style={{ color: 'black' }} />;
          break;
        default:
          throw new Error('Invalid health check rating');
      }
      break;
    case 'OccupationalHealthcare':
      display.icon = <WorkIcon />;
      display.employer = entry.employerName;
      break;
    case 'Hospital':
      display.icon = <NightShelterIcon />;
      break;
    default:
      return assertNever(entry);
  }

  return (
    <div className='entry'>
      <p>
        {entry.date} {display.icon}
      </p>
      <p>
        <em>{entry.description}</em>
      </p>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} {diagnoses.find((d) => d.code === code)?.name}
          </li>
        ))}
      </ul>

      {display.heart}

      <p>Diagnose by {entry.specialist}</p>
    </div>
  );
}
