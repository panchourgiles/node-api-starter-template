import response from '@network/response';
import Logger from '@utils/logger';
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
        return response(res, users, 201);
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
    async function (req, res) {
      try {
        const { userId } = req.params;
        const { body: user } = req;
        const updatedUser = await userController.updateUser(userId, user);
        if (!updatedUser) {
          return response.status(404).send();
        }
        return response(res, updatedUser, 200);
      } catch (error) {
        Logger.error(error.message);
        return response(res, error.message, 500);
      }
    }
  );

  router.get('/', async function (_req, res) {
    try {
      const users = await userController.listUsers();
      return response(res, users, 200);
    } catch (error) {
      Logger.error(error.message);
      return response(res, error.message, 500);
    }
  });

  router.get(
    '/:userId',
    validationHandler(getUserSchema, 'params'),
    async function (req, res) {
      try {
        const { userId } = req.params;
        const user = await userController.getUser(userId);
        if (!user) {
          return response(res, user, 404);
        }
        return response(res, user, 200);
      } catch (error) {
        Logger.error(error.message);
        return response(res, error.message, 500);
      }
    }
  );

  router.delete(
    '/:userId',
    validationHandler(getUserSchema, 'params'),
    async function (req, res) {
      try {
        const { userId } = req.params;
        const data = await userController.deleteUser(userId);
        return response(res, data, 204);
      } catch (error) {
        Logger.error(error.message);
        return response(res, error.message, 500);
      }
    }
  );

  return router;
};
