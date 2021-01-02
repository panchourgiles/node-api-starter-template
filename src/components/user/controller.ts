import { User } from './model';
import store from './store';

export const addUser = (user: User) => {
  return store.addUser(user);
};

export const updateUser = ({
  userId,
  user
}: {
  userId: string;
  user: User;
}) => {
  return store.updateUser({ userId, user });
};

export const getUser = async (userId: string) => {
  return store.getUser(userId);
};

export const listUsers = async () => {
  return store.listUsers();
};
