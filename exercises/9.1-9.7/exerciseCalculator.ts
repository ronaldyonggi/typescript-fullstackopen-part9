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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
