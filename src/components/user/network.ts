import response from '@network/response';
import Logger from '@utils/logger';
import validationHandler from '@utils/validationHandler';
import { Request, Response } from 'express';
import { Router } from 'express';

import * as userController from './controller';
import { User } from './model';
import { createUserSchema, getUserSchema, updateUserSchema } from './schema';

export default () => {
  const router = Router();

  router.post(
    '/',
    validationHandler(createUserSchema),
    async function (req: Request, res: Response) {
      try {
        const newUser: User = req.body as User;
        const user = await userController.addUser(newUser);
        return response(res, user, 200);
      } catch (error) {
        Logger.error(error.message);
        return response(res, error.message, 500);
      }
    }
  );

  router.put(
    '/:userId',
    validationHandler(getUserSchema, 'params'),
    validationHandler(updateUserSchema),
    async function (req: Request, res: Response) {
      try {
        const { userId }: { userId: string } = req.params as { userId: string };
        const user: User = req.body as User;
        const updatedUser = await userController.updateUser({ userId, user });
        return response(res, updatedUser, 200);
      } catch (error) {
        Logger.error(error.message);
        return response(res, error.message, 500);
      }
    }
  );

  router.get(
    '/:userId',
    validationHandler(getUserSchema, 'params'),
    async function (req: Request, res: Response) {
      try {
        const { userId }: { userId: string } = req.params as { userId: string };
        const user = await userController.getUser(userId);
        return response(res, user, 200);
      } catch (error) {
        Logger.error(error.message);
        return response(res, error.message, 500);
      }
    }
  );

  router.get('/', async function (_req: Request, res: Response) {
    try {
      const users = await userController.listUsers();
      return response(res, users, 200);
    } catch (error) {
      Logger.error(error.message);
      return response(res, error.message, 500);
    }
  });

  return router;
};
