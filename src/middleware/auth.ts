import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCodes';
import { verifyToken } from '../utils/token';

const authentication = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers['x-access-token'] as string;

  if (!token) {
    const { code, text } = HTTP_STATUS_CODES.FORBIDDEN;
    return response.status(code).json({
      success: false,
      message: text,
    });
  }

  try {
    verifyToken(token);
    return next();
  } catch (error) {
    const { code, text } = HTTP_STATUS_CODES.UNAUTHORIZED;
    response.status(code).json({
      success: false,
      message: text,
    });
  }
};

export { authentication };
