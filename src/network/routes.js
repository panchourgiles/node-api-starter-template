import userRouter from '@components/user/network';
import response from '@network/response';
import { Router } from 'express';

export default () => {
  const router = Router();

  router.get('/', (_req, res) => {
    return response(res, { message: 'Api is ready' }, 200);
  });

  router.use('/users', userRouter());
  return router;
};
