import { Request, Response } from 'express';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCodes';
import { _createPermisson, _getPermissions } from '../helpers/permissons';
import { successResponse } from '../utils/response';

interface IController {
  (request: Request, response: Response): unknown;
}

const createPermission: IController = async (request, response) => {
  const { name, description } = request.body;

  await _createPermisson(name, description);

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
