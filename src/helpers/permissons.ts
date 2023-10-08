import { PermissionModel } from '../models/Permissions';

const createPermissonHelper = (name: string, description: string) =>
  new PermissionModel({ name, description }).save();

export { createPermissonHelper };
