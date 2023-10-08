import { Request, Response } from 'express';
import { createPermissonHelper } from '../helpers/permissons';
import { errorResponse, successResponse } from '../utils/response';

interface IController {
  (request: Request, response: Response): unknown;
}

const createPermisson: IController = async (request, response) => {
  try {
    const { name, description } = request.body;

    await createPermissonHelper(name, description);

    return response.status(201).json(successResponse('Permission Created'));
  } catch (error) {
    return response.status(500).json(errorResponse(error));
  }
};

export { createPermisson };
