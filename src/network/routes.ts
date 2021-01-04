import userRouter from '@components/user/network';
import { Request, Response, Router } from 'express';

export default (): Router => {
  const router: Router = Router();

  router.get('/', (_req: Request, res: Response) => {
    return res.json({ message: 'Api is ready' });
  });

  router.use('/users', userRouter());
  return router;
};
