import UserModel from './model';

function addUser(user) {
  const newUser = new UserModel(user);
  return newUser.save();
}

function updateUser(id, user) {
  const updatedUser = UserModel.findOneAndUpdate({ _id: id }, user, {
    new: true,
    useFindAndModify: false
  });
  return updatedUser;
}

function getUser(id) {
  const user = UserModel.findOne({ _id: id });
  return user;
}

function listUsers() {
  const users = UserModel.find();
  return users;
}

function deleteUser(id) {
  const user = UserModel.deleteOne({ _id: id });
  return user;
}

export default {
  add: addUser,
  update: updateUser,
  get: getUser,
  list: listUsers,
  delete: deleteUser
};
