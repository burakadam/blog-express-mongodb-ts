import { IRole, RoleModel } from '@/models/Role';

const _createRole = (params: IRole) => new RoleModel(params).save();

const _getRoleList = () => RoleModel.find();

export { _createRole, _getRoleList };
