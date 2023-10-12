import { NextFunction, Request, Response } from 'express';

const serviceHandler =
  (fn: Function) =>
  (request: Request, response: Response, next: NextFunction) =>
    Promise.resolve(fn(request, response, next)).catch(next);

export { serviceHandler };
