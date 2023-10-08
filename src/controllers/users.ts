import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { _createUser, _getUsers, _updateUserById } from '../helpers/user';
import { createHashedPassword } from '../utils/password';
import { errorResponse, successResponse } from '../utils/response';

interface IController {
  (request: Request, response: Response): unknown;
}

const createUser: IController = async (request, response) => {
  try {
    const { email, password, permissions } = request.body;
    const hashedPassword = await createHashedPassword(password);

    const user = await _createUser({
      email,
      password: hashedPassword,
      isActive: true,
      permissions,
    });

    return response.status(201).json(successResponse('User Created', user));
  } catch (error) {
    const errorMessage =
      error instanceof mongoose.mongo.MongoError && error.code === 11000
        ? 'User is already exist'
        : error;
    return response.status(500).json(errorResponse(errorMessage));
  }
};

const updateUserPassword: IController = async (request, response) => {
  try {
    const { id, password } = request.body;
    const hashedPassword = await createHashedPassword(password);

    const user = _updateUserById(id, { password: hashedPassword });
    if (!user)
      return response.status(500).json(errorResponse('User not found'));

    return response
      .status(201)
      .json(successResponse('Password updated successfully'));
  } catch (error) {
    return response.status(500).json(errorResponse(error));
  }
};

const getUsers: IController = async (request, response) => {
  try {
    const users = await _getUsers();

    return response.status(201).json(successResponse('Users List', users));
  } catch (error) {
    return response.status(500).json(errorResponse(error));
  }
};

export { createUser, getUsers, updateUserPassword };
