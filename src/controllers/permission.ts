import { HTTP_STATUS_CODES } from '@/constants/httpStatusCodes';
import { _createPermisson, _getPermissions } from '@/helpers/permisson';
import { successResponse } from '@/utils/response';
import { Request, Response } from 'express';

interface IController {
  (request: Request, response: Response): unknown;
}

const createPermission: IController = async (request, response) => {
  const { name, description, route } = request.body;

  await _createPermisson({ name, description, route });

  return response
    .status(HTTP_STATUS_CODES.CREATED.code)
    .json(successResponse('Permission Created'));
};

const getPermissions: IController = async (request, response) => {
  const permissions = await _getPermissions();

  return response
    .status(HTTP_STATUS_CODES.OK.code)
    .json(successResponse('Permission List', permissions));
};

export { createPermission, getPermissions };
