import store from './store';

export const addUser = (user) => {
  return store.add(user);
};

export const updateUser = (id, user) => {
  return store.update(id, user);
};

export const getUser = async (userId) => {
  return store.get(userId);
};

export const listUsers = async () => {
  return store.list();
};
