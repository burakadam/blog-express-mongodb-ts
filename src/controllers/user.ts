import { HTTP_STATUS_CODES } from '@/constants/httpStatusCodes';
import {
  _createUser,
  _getUsers,
  _updateUserActiveStatusById,
  _updateUserById,
  _updateUserProfileById,
} from '@/helpers/mongoose/user';
import { saveImageToS3 } from '@/helpers/saveImageToS3';
import { CustomError } from '@/utils/customError';
import { createHashedPassword } from '@/utils/password';
import { successResponse } from '@/utils/response';
import { Request, Response } from 'express';

interface IController {
  (request: Request, response: Response): unknown;
}

const createUser: IController = async (request, response) => {
  const { email, password, role, fullName } = request.body;
  const hashedPassword = await createHashedPassword(password);

  const user = await _createUser({
    email,
    password: hashedPassword,
    isActive: true,
    fullName,
    role,
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

const toggleUserActiveStatus: IController = async (request, response) => {
  const { id, isActive } = request.body;

  await _updateUserActiveStatusById(id, isActive);

  const users = await _getUsers();

  return response
    .status(HTTP_STATUS_CODES.OK.code)
    .json(
      successResponse(`User ${isActive ? 'activated' : 'deactivated'}`, users)
    );
};

const updateUser: IController = async (request, response) => {
  const { _id, fullName, profilePicture } = request.body;
  let posterUrl;

  if (request.file) posterUrl = await saveImageToS3(request.file);
  else posterUrl = profilePicture;

  const user = await _updateUserProfileById(_id, posterUrl, fullName);

  if (!user)
    throw CustomError('User not found', HTTP_STATUS_CODES.NOT_FOUND.code);

  return response
    .status(HTTP_STATUS_CODES.OK.code)
    .json(successResponse('Profile Updated', user));
};

export {
  createUser,
  getUsers,
  toggleUserActiveStatus,
  updateUser,
  updateUserPassword,
};
