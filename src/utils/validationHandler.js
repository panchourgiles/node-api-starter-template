import response from '@network/response';
import Logger from '@utils/logger';

const validationHandler = (schema, property = 'body') => {
  return async (req, res, next) => {
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
