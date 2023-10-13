import { Request, Response } from 'express';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCodes';
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
      HTTP_STATUS_CODES.UNAUTHORIZED.code
    );

  const user = await _findUserByEmail(email);

  if (!user) {
    throw CustomError('User not found', HTTP_STATUS_CODES.UNAUTHORIZED.code);
  }

  const isPasswordValid = await compareHashedPassword(password, user.password);

  if (!isPasswordValid) {
    throw CustomError(
      'Password is not match',
      HTTP_STATUS_CODES.UNAUTHORIZED.code
    );
  }

  const token = createToken(user._id, email);

  response.status(HTTP_STATUS_CODES.ACCEPTED.code).json(
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
