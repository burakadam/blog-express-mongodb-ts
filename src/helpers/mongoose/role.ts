import { RoleModel } from '@/models/Role';

const _createRole = (
  name: string,
  permissions: [{ name: string; id: string }]
) =>
  new RoleModel({
    name,
    permissions,
  });

export { _createRole };
