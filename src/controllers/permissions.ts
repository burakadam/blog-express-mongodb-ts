import { Request, Response } from 'express';
import { _createPermisson, _getPermissions } from '../helpers/permissons';
import { errorResponse, successResponse } from '../utils/response';

interface IController {
  (request: Request, response: Response): unknown;
}

const createPermission: IController = async (request, response) => {
  try {
    const { name, description } = request.body;

    await _createPermisson(name, description);

    return response.status(201).json(successResponse('Permission Created'));
  } catch (error) {
    return response.status(500).json(errorResponse(error));
  }
};

const getPermissions: IController = async (request, response) => {
  try {
    const permissions = await _getPermissions();

    return response
      .status(201)
      .json(successResponse('Permission List', permissions));
  } catch (error) {
    return response.status(500).json(errorResponse(error));
  }
};

export { createPermission, getPermissions };
