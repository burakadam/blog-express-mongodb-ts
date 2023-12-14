import { PermissionModel } from '@/models/Permission';

const _createPermisson = (name: string, description: string, route: string) =>
  new PermissionModel({ name, description, route }).save();

const _getPermissions = () => PermissionModel.find();

const _findPermissionByRoute = (route: string) =>
  PermissionModel.findOne({ route });

export { _createPermisson, _findPermissionByRoute, _getPermissions };
