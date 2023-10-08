import { PermissionModel } from '../models/Permissions';

const _createPermisson = (name: string, description: string) =>
  new PermissionModel({ name, description }).save();

const _getPermissions = () => PermissionModel.find();

export { _createPermisson, _getPermissions };
