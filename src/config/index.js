import dotenv from 'dotenv';
dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const mongoDBURI = dev
  ? process.env.MONGODB_URI_LOCAL
  : process.env.MONGODB_URI;
const port = process.env.PORT || 9000;

export const config = {
  mongoDBURI,
  dev,
  port
};
