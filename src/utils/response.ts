const standartResponse = (
  success: boolean,
  message: string | unknown,
  rest?: object
) => ({
  success,
  message,
  ...rest,
});

const successResponse = (message: string | unknown, rest?: object) =>
  standartResponse(true, message, rest);

const errorResponse = (message: string | unknown, rest?: object) =>
  standartResponse(false, message ?? 'Internal Server Error', rest);

export { errorResponse, successResponse };
