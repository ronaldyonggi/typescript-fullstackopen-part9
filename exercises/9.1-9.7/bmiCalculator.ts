/** 
 * Calculates BMI based on weight (kg) and height (cm)
 * bmi = mass / height^2
 */
function calculateBmi(height: number, weight: number): string {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
}

console.log(calculateBmi(180, 74));