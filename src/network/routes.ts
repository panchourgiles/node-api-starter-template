import userRouter from '@components/user/network';
import { Router } from 'express';

export default (): Router => {
  const router: Router = Router();

  router.use('/users', userRouter());
  return router;
};
