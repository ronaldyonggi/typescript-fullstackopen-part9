import { CoursePart } from '../utils/types';
import Part from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}

export default function Content({ courseParts }: ContentProps) {
  return (
    <>
      {courseParts.map((part) => (
        <div key={part.name}>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <Part coursePart={part} />
        </div>
      ))}
    </>
  );
}
