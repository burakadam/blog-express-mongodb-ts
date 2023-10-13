import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCodes';

import { CustomError } from '../utils/customError';
import { verifyToken } from '../utils/token';

const authentication = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { code, text } = HTTP_STATUS_CODES.UNAUTHORIZED;
  const token = request.headers['x-access-token'] as string;

  if (!token) throw CustomError(text, code);

  const user_id = verifyToken(token);

  if (!user_id) throw CustomError(text, code);

  request.userId = user_id;
  return next();
};

export { authentication };
