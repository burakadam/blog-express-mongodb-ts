import { Request, Response } from 'express';

import { _findUserByEmail } from '../helpers/user';
import { CustomError } from '../utils/customError';
import { compareHashedPassword } from '../utils/password';
import { successResponse } from '../utils/response';
import { createToken } from '../utils/token';

const login = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  if (!email || !password)
    throw CustomError(
      `Please enter valid ${!email ? 'email' : 'password'}`,
      500
    );

  const user = await _findUserByEmail(email);

  if (!user) {
    throw CustomError('User not found', 500);
  }

  const isPasswordValid = await compareHashedPassword(password, user.password);

  if (!isPasswordValid) {
    throw CustomError('Password is not match', 500);
  }

  const token = createToken(user._id, email);

  response.status(201).json(
    successResponse('Login successfully.', {
      user: {
        id: user._id,
        email: user.email,
        token,
        permissions: user.permissions,
      },
    })
  );
};

export { login };
