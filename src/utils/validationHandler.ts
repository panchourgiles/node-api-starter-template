import response from '@network/response';
import Logger from '@utils/logger';
import { NextFunction, Response } from 'express';
import { Schema, ValidationError, ValidationErrorItem } from 'joi';

const validationHandler = (schema: Schema, property = 'body') => {
  return (req: { [key: string]: any }, res: Response, next: NextFunction) => {
    const { error }: { error?: ValidationError } = schema.validate(
      req[property]
    );
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const details: ValidationErrorItem[] | undefined = error?.details;
      const message = details && details.map((i) => i.message).join(',');
      Logger.error(message);
      return response(res, { error: message }, 422);
    }
  };
};

export default validationHandler;
