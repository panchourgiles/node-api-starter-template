import expressLoader from './express';
import mongooseLoader from './mongoose';

export default async ({ app }) => {
  await mongooseLoader();

  expressLoader({
    app
  });
};
