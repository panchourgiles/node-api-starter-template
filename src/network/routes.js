import userRouter from '@components/user/network';
import { Router } from 'express';

export default () => {
  const router = Router();

  router.use('/users', userRouter());
  return router;
};
