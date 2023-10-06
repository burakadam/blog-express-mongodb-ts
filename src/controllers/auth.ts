import { Request, Response } from 'express';

import { findUserByEmailHelper } from '../helpers/user';
import { compareHashedPassword } from '../utils/password';
import { errorResponse, successResponse } from '../utils/response';
import { createToken } from '../utils/token';

const login = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const user = await findUserByEmailHelper(email);

    if (!user) {
      return response.status(401).json(errorResponse('User not found!'));
    }

    const isPasswordValid = compareHashedPassword(password, user.password);

    if (!isPasswordValid) {
      return response.status(401).json(errorResponse('Invalid password'));
    }

    const token = createToken(user._id, email);

    response
      .status(201)
      .json(
        successResponse('Login successfully.', {
          user: { id: user._id, email: user.email, token },
        })
      );
  } catch (error) {
    //NOTE handle error message
    response.status(500).json(errorResponse(error));
  }
};

export { login };
