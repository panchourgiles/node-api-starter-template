import { json } from 'express';
import routes from '../network/routes';
import {
  catchNotFound,
  logging,
  clientErrorHandler,
  errorHandler
} from '../utils/errorHandler';

export default async ({ app }) => {
  app.use(json());

  //Routes
  routes(app);

  // Error handlers
  app.use(catchNotFound);
  app.use(logging);
  app.use(clientErrorHandler);
  app.use(errorHandler);

  return app;
};
