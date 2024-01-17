import { IPermission, PermissionModel } from '@/models/Permission';

const _createPermisson = ({ name, description, route }: IPermission) =>
  new PermissionModel({ name, description, route }).save();

const _getPermissions = () => PermissionModel.find();

type TRoute = Pick<IPermission, 'route'>;

const _findPermissionByRoute = ({ route }: TRoute) =>
  PermissionModel.findOne({ route });

export { _createPermisson, _findPermissionByRoute, _getPermissions };
