import { UserModel } from '../models/Users';

const createUserHelper = (values: Record<string, any>) =>
  new UserModel(values).save();

const findUserByEmailHelper = (email: string) => UserModel.findOne({ email });

const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);

export { createUserHelper, findUserByEmailHelper, updateUserById };
