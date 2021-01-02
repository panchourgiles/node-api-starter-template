import loaders from '@loaders/index';
import express, { Express } from 'express';

export default async () => {
  const app: Express = express();

  await loaders({ app });

  return app;
};
