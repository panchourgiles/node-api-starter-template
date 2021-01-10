import response from '@network/response';
import validationHandler from '@utils/validationHandler';
import { Router } from 'express';

import * as userController from './controller';
import { createUserSchema, getUserSchema, updateUserSchema } from './schema';

export default () => {
  const router = Router();
  router.post(
    '/',
    validationHandler(createUserSchema),
    async function (req, res) {
      try {
        const users = await userController.addUser(req.body);
        return response(res, users, 200);
      } catch (error) {
        return response(res, error, 500);
      }
    }
  );

  router.put(
    '/:userId',
    validationHandler(getUserSchema, 'params'),
    validationHandler(updateUserSchema),
    async function (req, res) {
      try {
        const { userId } = req.params;
        const { body: user } = req;
        const updatedUser = await userController.updateUser(userId, user);
        return response(res, updatedUser, 200);
      } catch (error) {
        return response(res, error, 500);
      }
    }
  );

  router.get('/', async function (_req, res) {
    try {
      const users = await userController.listUsers();
      return response(res, users, 200);
    } catch (error) {
      return response(res, error, 500);
    }
  });

  router.get(
    '/:userId',
    validationHandler(getUserSchema, 'params'),
    async function (req, res) {
      try {
        const { userId } = req.params;
        const user = await userController.getUser(userId);
        return response(res, user, 200);
      } catch (error) {
        return response(res, error, 500);
      }
    }
  );

  return router;
};
