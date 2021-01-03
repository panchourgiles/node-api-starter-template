import loaders from '@loaders';
import express from 'express';

export default async () => {
  const app = express();

  await loaders({
    app
  });

  return app;
};
