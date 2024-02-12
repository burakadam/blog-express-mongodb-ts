import { HTTP_STATUS_CODES } from '@/constants/httpStatusCodes';
import { _createRole } from '@/helpers/mongoose/role';
import { IRole } from '@/models/Role';
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

export { createRole };
