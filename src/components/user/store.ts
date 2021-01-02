import UserModel, { User } from './model';

function addUser(user: User) {
  const newUser = new UserModel(user);
  return newUser.save();
}

function updateUser({ userId, user }: { userId: string; user: User }) {
  const updatedUser = UserModel.findOneAndUpdate({ _id: userId }, user, {
    new: true,
    useFindAndModify: false
  });
  return updatedUser;
}

function getUser(userId: string) {
  const user = UserModel.findOne({ _id: userId });
  return user;
}

function listUsers() {
  const users = UserModel.find();
  return users;
}

export default {
  addUser,
  updateUser,
  getUser,
  listUsers
};
