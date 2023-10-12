import { ICustomError } from './customError';

interface ISuccessResponse extends ICustomError {
  message: string | null;
  payload?: object;
}

const successResponse = (
  message: string | null,
  payload?: object
): ISuccessResponse => ({
  success: true,
  errorMessage: null,
  message,
  statusCode: 200,
  payload,
});

export { successResponse };
