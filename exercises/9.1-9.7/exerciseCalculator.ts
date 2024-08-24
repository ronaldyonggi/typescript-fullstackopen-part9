interface ExerciseInput {
  hours: number[];
  target: number;
}

const parseArguments = (args: string[]): ExerciseInput => {
  const hours: number[] = [];
  if (args.length < 4) throw new Error('Not enough arguments');
  for (let i = 3; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      hours.push(Number(args[i]));
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }
  return {
    hours,
    target: Number(args[2]),
  };
};

interface ExerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(hours: number[], target: number): ExerciseResults {
  // Length of input array
  const periodLength = hours.length;
  // Number of days with > 0 hours
  const trainingDays = hours.filter((hours) => hours > 0).length;
  // Average training hours
  const average = hours.reduce((a, b) => a + b, 0) / periodLength;
  // Whether target was reached
  const success = average >= target;
  let rating = 0;
  let ratingDescription = 'good';
  if (average === 0) {
    rating = 1;
    ratingDescription = 'bad';
  } else if (average < target) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else if (average > target) {
    rating = 3;
    ratingDescription = 'excellent';
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

try {
  console.log(process.argv);
  const { hours, target } = parseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
