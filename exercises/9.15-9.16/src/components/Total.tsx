interface TotalProps {
  courseParts: { name: string; exerciseCount: number }[];
}

export default function Total({ courseParts }: TotalProps) {
  return (
    <p>
      Number of exercises{' '}
      {courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)}
    </p>
  );
}
