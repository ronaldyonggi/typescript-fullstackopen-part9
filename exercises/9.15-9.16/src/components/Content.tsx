interface ContentProps {
  courseParts: { name: string; exerciseCount: number }[];
}

export default function Content({ courseParts }: ContentProps) {
  return (
    <>
      {courseParts.map((part) => (
        <p>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </>
  );
}
