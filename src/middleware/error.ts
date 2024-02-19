import { HTTP_STATUS_CODES } from '@/constants/httpStatusCodes';
import { CustomError, ICustomError } from '@/utils/customError';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

const handleDuplicateKeyError = (err: any): ICustomError => {
  const code = HTTP_STATUS_CODES.CONFLICT.code;
  if (err.hasOwnProperty('keyValue')) {
    const field = Object.keys(err.keyValue)[0];
    const error = `${field.toUpperCase()} already in use.`;

    return CustomError(error, code);
  } else {
    return CustomError('There was a duplicate key error', code);
  }
};

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  let errors = Object.values(err.errors).map((el) => el.message);
  let code = HTTP_STATUS_CODES.BAD_REQUEST.code;

  if (errors.length > 1) {
    const formattedErrors = errors.join(' ');
    return CustomError(formattedErrors, code);
  } else {
    return CustomError(errors[0], code);
  }
};

let errorObject: ICustomError = {
  success: false,
  statusCode: 500,
  errorMessage: 'Something went wrong! Please try again later.',
};

const defaultStatusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.code;

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(err);
    if (err.name === 'ValidationError')
      errorObject = handleValidationError(
        err as mongoose.Error.ValidationError
      );

    if (err.code && err.code == 11000)
      errorObject = handleDuplicateKeyError(err);

    if (err.errorMessage) errorObject = err;

    return res.status(err.statusCode || defaultStatusCode).json(errorObject);
  } catch (error) {
    errorObject.errorMessage = 'An unknown error occurred.';
    return res.status(defaultStatusCode).json(errorObject);
  }
}

export { errorHandler };
