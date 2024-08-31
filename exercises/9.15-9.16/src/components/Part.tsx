import { assertNever, CoursePart } from '../utils/types';

interface PartProps {
  coursePart: CoursePart;
}

export default function Part({ coursePart }: PartProps) {
  const { kind } = coursePart;
  function toRender() {
    switch (kind) {
      case 'basic':
        return <p>{coursePart.description}</p>;
      case 'group':
        return <p>project exercises {coursePart.groupProjectCount}</p>;
      case 'background':
        return (
          <>
            <p>{coursePart.description} </p>
            <p>submit to {coursePart.backgroundMaterial}</p>
          </>
        );
      case 'special':
        return (
          <>
            <p>{coursePart.description}</p>
            <p>required skills: {coursePart.requirements.join(', ')}</p>
          </>
        );
      default:
        return assertNever(coursePart);
    }
  }
  return toRender();
}
