import { HTTP_STATUS_CODES } from '@/constants/httpStatusCodes';
import { _getPermissionList } from '@/helpers/mongoose/permission';
import {
  _createRole,
  _findRoleById,
  _getRoleList,
  _updateRoleById,
} from '@/helpers/mongoose/role';
import { IRole } from '@/models/Role';
import { CustomError } from '@/utils/customError';
import { successResponse } from '@/utils/response';
import { Request, Response } from 'express';

interface IController {
  (request: Request, response: Response): unknown;
}

const createRole: IController = async (request, response) => {
  const { name, permissions } = request.body;

  await _createRole({ name, permissions } as IRole);

  return response
    .status(HTTP_STATUS_CODES.CREATED.code)
    .json(successResponse('Role Created'));
};

const getRoles: IController = async (_, response) => {
  const roles = await _getRoleList();

  return response
    .status(HTTP_STATUS_CODES.OK.code)
    .json(successResponse('Role List', roles));
};

const getRoleDetail: IController = async (request, response) => {
  const { _id } = request.body;

  const role = await _findRoleById(_id);

  if (!role)
    throw CustomError('Role not found', HTTP_STATUS_CODES.NOT_FOUND.code);

  const permissionList = _getPermissionList();

  const permissions = Object.values(permissionList).map((permission) => ({
    name: permission.name,
    id: permission.id,
  }));

  return response.status(HTTP_STATUS_CODES.OK.code).json(
    successResponse(
      'Role Detail',
      {
        role,
        permissions,
      } || {}
    )
  );
};

const updateRoleById: IController = async (request, response) => {
  const { _id, name, permissions } = request.body;

  const role = await _updateRoleById(_id, { name, permissions } as IRole);

  if (!role)
    throw CustomError('Role not found', HTTP_STATUS_CODES.NOT_FOUND.code);

  return response
    .status(HTTP_STATUS_CODES.OK.code)
    .json(successResponse('Role Updated'));
};

export { createRole, getRoleDetail, getRoles, updateRoleById };
