import expressLoader from './express';
import mongooseLoader from './mongoose';

const isTesting = process.env.NODE_ENV === 'test';

export default async ({ app }) => {
  if (!isTesting) {
    await mongooseLoader();
  }

  expressLoader({
    app
  });
};
