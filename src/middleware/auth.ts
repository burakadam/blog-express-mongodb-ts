import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/token';

const authentication = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers['x-access-token'] as string;

  if (!token) {
    return response.status(403).json({
      success: false,
      message: 'A token is required for authentication',
    });
  }

  try {
    verifyToken(token);
    return next();
  } catch (error) {
    response.status(401).json({
      success: false,
      message: 'Invalid Token',
    });
  }
};

export { authentication };
