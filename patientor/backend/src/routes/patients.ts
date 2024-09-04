import express, { Request, Response } from 'express';
import patientService from '../services/patientService';
import middleware from '../utils/middleware';
import { NewPatient, Patient } from '../utils/types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAllPatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatient(id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post(
  '/',
  middleware.newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    return res.json(addedPatient);
  }
);

export default router;
