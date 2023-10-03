import { UserModel } from '../models/Users';

const createUserHelper = (values: Record<string, any>) =>
  new UserModel(values).save();

export { createUserHelper };
