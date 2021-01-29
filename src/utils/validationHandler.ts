import response from '@network/response';
import Logger from '@utils/logger';
import { NextFunction, Response } from 'express';
import { Schema } from 'joi';

const validationHandler = (schema: Schema, property = 'body') => {
  return async (
    req: { [key: string]: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      await schema.validateAsync(req[property]);
      next();
    } catch (error) {
      const { message } = error;
      Logger.error(message);
      return response(
        res,
        {
          error: message
        },
        422
      );
    }
  };
};

export default validationHandler;
