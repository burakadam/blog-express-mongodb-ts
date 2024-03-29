import { IRole, RoleModel } from '@/models/Role';

const _createRole = (params: IRole) => new RoleModel(params).save();

const _getRoleList = () => RoleModel.find();

const _findRoleById = (_id: string) => RoleModel.findById(_id);

const _updateRoleById = (id: string, params: IRole) =>
  RoleModel.findByIdAndUpdate(id, params);

export { _createRole, _findRoleById, _getRoleList, _updateRoleById };
