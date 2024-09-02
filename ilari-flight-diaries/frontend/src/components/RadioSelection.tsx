import React from 'react';
import { Visibility, Weather } from '../utils/types';

interface RadioSelectionProps {
  enumType: typeof Weather | typeof Visibility;
  name: string;
  setter:
    | React.Dispatch<React.SetStateAction<Weather | null>>
    | React.Dispatch<React.SetStateAction<Visibility | null>>;
}

export default function RadioSelection({
  enumType,
  name,
  setter,
}: RadioSelectionProps) {
  return (
    <>
      {Object.entries(enumType).map(([key, value]) => (
        <React.Fragment key={key}>
          <input
            type='radio'
            id={value}
            name={name}
            value={value}
            onChange={() => setter(value)}
          />
          <label htmlFor={value}>{key}</label>
        </React.Fragment>
      ))}
    </>
  );
}
