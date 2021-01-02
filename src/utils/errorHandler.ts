import { NextFunction, Request, Response } from 'express';

import Logger from './logger';

export const catchNotFound = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const error = new Error('Not Found');
  next(error);
};

export const logging = (
  error: Error,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  Logger.error(error);
  next(error);
};

export const clientErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(error);
  }
};

export const errorHandler = (error: Error, _req: Request, res: Response) => {
  res.status(500).send({ error: error.message });
};
