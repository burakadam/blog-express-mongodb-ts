interface ICustomError {
  errorMessage: string | null;
  statusCode: number;
  success: boolean;
}

const CustomError = (
  errorMessage: string,
  statusCode: number
): ICustomError => {
  const error: ICustomError = {
    errorMessage,
    statusCode,
    success: false,
  };

  Error.captureStackTrace(error, CustomError);
  return error;
};

export { CustomError, ICustomError };
