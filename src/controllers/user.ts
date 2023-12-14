import { HTTP_STATUS_CODES } from '@/constants/httpStatusCodes';
import { _createUser, _getUsers, _updateUserById } from '@/helpers/user';
import { CustomError } from '@/utils/customError';
import { createHashedPassword } from '@/utils/password';
import { successResponse } from '@/utils/response';
import { Request, Response } from 'express';

interface IController {
  (request: Request, response: Response): unknown;
}

const createUser: IController = async (request, response) => {
  const { email, password, permissions } = request.body;
  const hashedPassword = await createHashedPassword(password);

  const user = await _createUser({
    email,
    password: hashedPassword,
    isActive: true,
    permissions,
  });

  return response
    .status(HTTP_STATUS_CODES.CREATED.code)
    .json(successResponse('User Created', user));
};

const updateUserPassword: IController = async (request, response) => {
  const { id, password } = request.body;
  const hashedPassword = await createHashedPassword(password);

  const user = _updateUserById(id, { password: hashedPassword });
  if (!user)
    throw CustomError('User not found', HTTP_STATUS_CODES.UNAUTHORIZED.code);

  return response
    .status(HTTP_STATUS_CODES.ACCEPTED.code)
    .json(successResponse('Password updated successfully'));
};

const getUsers: IController = async (request, response) => {
  const users = await _getUsers();

  return response
    .status(HTTP_STATUS_CODES.OK.code)
    .json(successResponse('Users List', users));
};

export { createUser, getUsers, updateUserPassword };
