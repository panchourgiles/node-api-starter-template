import { Response } from 'express';
const response = (res: Response, data: any, statusCode: number) => {
  return res.format({
    json: () => {
      res.type('application/json');
      res.status(statusCode).send(data);
    },
    default: () => {
      res.status(406).send({
        error: 'Not Acceptable'
      });
    }
  });
};

export default response;
