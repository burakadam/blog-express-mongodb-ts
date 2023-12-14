import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCodes';
import { _findPermissionByRoute } from '../helpers/permisson';
import { _getUserById } from '../helpers/user';
import { CustomError } from '../utils/customError';

const checkPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code } = HTTP_STATUS_CODES.UNAUTHORIZED;
  const text = 'User does not have necessary permission!';
  const route = req.originalUrl;

  const user = await _getUserById(req.userId);
  const permission = await _findPermissionByRoute(route);

  if (!user?.permissions || !permission) throw CustomError(text, code);

  if (!user.permissions.includes(permission.name))
    throw CustomError(text, code);

  next();
};

export { checkPermission };
