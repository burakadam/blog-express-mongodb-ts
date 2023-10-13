import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCodes';
import { _getUserById } from '../helpers/user';
import { CustomError } from '../utils/customError';

const checkPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await _getUserById(req.userId);

  if (!user) {
    const { code, text } = HTTP_STATUS_CODES.UNAUTHORIZED;
    throw CustomError(text, code);
  }

  console.log('%%%%PERMISSON%%%', user);
  next();
};

export { checkPermission };
