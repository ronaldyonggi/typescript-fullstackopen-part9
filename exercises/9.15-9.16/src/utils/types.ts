interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  kind: 'group';
  groupProjectCount: number;
}

interface CoursePartBackground extends CoursePartDescription {
  kind: 'background';
  backgroundMaterial: string;
}

interface CoursePartSpecial extends CoursePartDescription {
  kind: 'special';
  requirements: string[];
}

export function assertNever(value: never): never {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
