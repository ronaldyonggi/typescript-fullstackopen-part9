import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  const addedPatient = patientService.addPatient(req.body);
  return res.json(addedPatient);
});

export default router;
