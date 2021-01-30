import { config } from '@config/index';
import Logger from '@utils/logger';
import mongoose from 'mongoose';

export default async () => {
  try {
    await mongoose.connect(config.mongoDBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    Logger.info('Connected succesfully to mongo');
  } catch (error) {
    Logger.error(`MongoDB connection error: ${error}`);
  }
};
