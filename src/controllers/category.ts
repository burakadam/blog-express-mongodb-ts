import { HTTP_STATUS_CODES } from 'constants/httpStatusCodes';
import { Request, Response } from 'express';
import { _createCategory, _getCategories } from 'helpers/cetagory';
import { successResponse } from 'utils/response';

interface IController {
  (request: Request, response: Response): unknown;
}

const createCategory: IController = async (request, resposne) => {
  const { name, description } = request.body;

  await _createCategory(name, description);

  return resposne
    .status(HTTP_STATUS_CODES.CREATED.code)
    .json(successResponse('Permission Created'));
};

const getCategories: IController = async (request, resposne) => {
  const categories = await _getCategories();

  return resposne
    .status(HTTP_STATUS_CODES.OK.code)
    .json(successResponse('Category List', categories));
};

export { createCategory, getCategories };
