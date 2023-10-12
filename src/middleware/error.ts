import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { CustomError, ICustomError } from '../utils/customError';

const handleDuplicateKeyError = (err: any): ICustomError => {
  const code = 409;
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
  let code = 400;

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

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.error('%%%%ERROR%%%%%', err);

    if (err.name === 'ValidationError')
      errorObject = handleValidationError(
        err as mongoose.Error.ValidationError
      );

    if (err.code && err.code == 11000)
      errorObject = handleDuplicateKeyError(err);

    if (err.errorMessage) errorObject = err;

    return res.status(500).json(errorObject);
  } catch (error) {
    errorObject.errorMessage = 'An unknown error occurred.';
    return res.status(500).json(errorObject);
  }
}

export { errorHandler };
