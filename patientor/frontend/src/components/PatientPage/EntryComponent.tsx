import { Diagnosis, Entry } from '../../types';

interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

export default function EntryComponent({ entry, diagnoses }: EntryProps) {
  return (
    <>
      <p>
        {entry.date} <em>{entry.description}</em>
      </p>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} {diagnoses.find((d) => d.code === code)?.name}
          </li>
        ))}
      </ul>

      <p>Diagnose by {entry.specialist}</p>
    </>
  );
}
