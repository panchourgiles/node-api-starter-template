import routes from '@network/routes';
import {
  catchNotFound,
  clientErrorHandler,
  errorHandler,
  logging
} from '@utils/errorHandler';
import { json } from 'express';

export default async ({ app }) => {
  app.use(json());

  //Routes
  app.use('/', routes());

  // Error handlers
  app.use(catchNotFound);
  app.use(logging);
  app.use(clientErrorHandler);
  app.use(errorHandler);

  return app;
};
