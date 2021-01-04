import userRouter from '@components/user/network';
import { Router } from 'express';

export default () => {
  const router = Router();

  router.get('/', (_req, res) => {
    return res.json({ message: 'Api is ready' });
  });

  router.use('/users', userRouter());
  return router;
};
