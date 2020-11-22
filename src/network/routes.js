import { Router } from 'express';
import userRouter from '../components/user/network';

export default (app) => {
  const router = Router();
  app.use('/users', userRouter(router));
};
