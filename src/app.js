import express from 'express';
import loaders from './loaders';

export default async () => {
  const app = express();

  await loaders({ app });

  return app;
};
