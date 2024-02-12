import { IRole, RoleModel } from '@/models/Role';

const _createRole = (params: IRole) => new RoleModel(params).save();

export { _createRole };
