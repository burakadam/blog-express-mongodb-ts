import { HTTP_STATUS_CODES } from '@/constants/httpStatusCodes';
import { _getPermissionList } from '@/helpers/mongoose/permission';
import { successResponse } from '@/utils/response';
import { Request, Response } from 'express';

interface IController {
  (request: Request, response: Response): unknown;
}

const getPermissions: IController = (requset, response) => {
  const permissionList = _getPermissionList();

  const permissions = Object.values(permissionList).map((permission) => ({
    name: permission.name,
    id: permission.id,
  }));

  return response
    .status(HTTP_STATUS_CODES.CREATED.code)
    .json(successResponse('Permission List', permissions));
};

export { getPermissions };
