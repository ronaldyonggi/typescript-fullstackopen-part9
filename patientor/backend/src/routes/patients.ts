import express, { Request, Response } from 'express';
import patientService from '../services/patientService';
import middleware from '../utils/middleware';
import { NewEntry, NewPatient, Patient } from '../utils/types';

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

router.post(
  '/:id/entries',
  middleware.newEntryParser,
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Patient>) => {
    const id = req.params.id;
    const newEntry = req.body;
    const patient = patientService.addEntry(id, newEntry);
    if (patient) {
      res.send();
    } else {
      res.sendStatus(404);
    }
  }
);

export default router;
