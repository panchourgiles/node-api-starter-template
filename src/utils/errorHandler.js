import Logger from './logger';

export const catchNotFound = (req, res, next) => {
  const error = new Error('Not Found');
  next(error);
};

export const logging = (error, req, res, next) => {
  Logger.error(error);
  next(error);
};

export const clientErrorHandler = (error, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(error);
  }
};

export const errorHandler = (error, req, res) => {
  res.status(500).send({ error: error.message });
};
