import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
