import { UserModel } from '../models/Users';

const createUserHelper = (values: Record<string, any>) =>
  new UserModel(values).save();

const findUserByEmailHelper = (email: string) => UserModel.findOne({ email });

export { createUserHelper, findUserByEmailHelper };
