import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { createUserHelper } from '../helpers/user';
import { createHashedPassword } from '../utils/password';
import { errorResponse, successResponse } from '../utils/response';

interface IController {
  (request: Request, response: Response): unknown;
}

const createUser: IController = async (request, response) => {
  try {
    const { email, password } = request.body;
    const hashedPassword = await createHashedPassword(password);

    const user = await createUserHelper({ email, password: hashedPassword });

    response.status(201).json(successResponse('User Created', user));
  } catch (error) {
    const errorMessage =
      error instanceof mongoose.mongo.MongoError && error.code === 11000
        ? 'User is already exist'
        : error;
    response.status(500).json(errorResponse(errorMessage));
  }
};

const getUsers: IController = async (request, response) => {
  response.status(201).json({
    success: true,
    message: 'User List',
  });
};

export { createUser, getUsers };
