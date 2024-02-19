import { UserModel } from '@/models/User';

const _createUser = (values: Record<string, any>) =>
  new UserModel(values).save();

const _findUserByEmail = (email: string) =>
  UserModel.findOne({ email }).select('+password');

const _updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);

const _getUsers = () => UserModel.find();

const _getUserById = (id: string) => UserModel.findById(id);

const _getUserByToken = (token: string) => UserModel.findOne({ token });

const _updateUserActiveStatusById = (id: string, isActiveValue: boolean) =>
  UserModel.findByIdAndUpdate(id, { isActive: isActiveValue }, { new: true });

const _updateUserProfileById = (
  id: string,
  profilePicture: string,
  fullName: string
) =>
  UserModel.findByIdAndUpdate(id, { profilePicture, fullName }, { new: true });

export {
  _createUser,
  _findUserByEmail,
  _getUserById,
  _getUserByToken,
  _getUsers,
  _updateUserActiveStatusById,
  _updateUserById,
  _updateUserProfileById,
};
