import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  // If height or weight is missing from the query string, send back a 400 error
  if (!height || !weight) {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  // If height or weight is not a number, send back a 400 error
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(Number(height), Number(weight));
  const result = {
    weight: Number(weight),
    height: Number(height),
    bmi,
  };

  res.json(result);
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const daily_exercises: any = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const target: any = req.body.target;

  // Check if any of the arguments is missing
  if (!daily_exercises || !target) {
    return res.status(400).send({ error: 'parameters missing' });
  }

  // Check if any of the arguments have mismatching types
  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, Number(target));
    return res.json(result);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return res.status(400).send({ error: errorMessage });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
