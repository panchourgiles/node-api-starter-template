import response from '@network/response';
import Logger from '@utils/logger';

const validationHandler = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');
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
