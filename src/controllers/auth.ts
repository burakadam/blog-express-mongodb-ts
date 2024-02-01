import { HTTP_STATUS_CODES } from '@/constants/httpStatusCodes';
import { _findUserByEmail, _getUserById } from '@/helpers/mongoose/user';
import { CustomError } from '@/utils/customError';
import { compareHashedPassword } from '@/utils/password';
import { successResponse } from '@/utils/response';
import { createToken, verifyToken } from '@/utils/token';
import { Request, Response } from 'express';

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
      id: user._id,
      email: user.email,
      token,
      permissions: user.permissions,
    })
  );
};

const me = async (request: Request, response: Response) => {
  const { code, text } = HTTP_STATUS_CODES.FORBIDDEN;
  const token = request.headers['x-access-token'] as string;

  if (!token) throw CustomError(text, code);

  const user_id = verifyToken(token);

  if (!user_id) throw CustomError(text, code);

  const user = await _getUserById(user_id);

  if (!user) throw CustomError(text, code);

  response
    .status(HTTP_STATUS_CODES.ACCEPTED.code)
    .json(successResponse('Login successfully.', user));
};

export { login, me };
