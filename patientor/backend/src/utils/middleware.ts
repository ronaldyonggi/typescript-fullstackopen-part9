import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { toNewEntry, toNewPatient } from './utils';

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    toNewPatient(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    toNewEntry(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

export default {
  newPatientParser,
  errorMiddleware,
  newEntryParser
};
