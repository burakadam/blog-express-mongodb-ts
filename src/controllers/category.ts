import { HTTP_STATUS_CODES } from '@/constants/httpStatusCodes';
import {
  _createCategory,
  _findCategoryById,
  _getCategories,
  _updateCategoryById,
} from '@/helpers/category';
import { successResponse } from '@/utils/response';
import { Request, Response } from 'express';

interface IController {
  (request: Request, response: Response): unknown;
}

const createCategory: IController = async (request, response) => {
  const { name, description } = request.body;

  await _createCategory(name, description);

  return response
    .status(HTTP_STATUS_CODES.CREATED.code)
    .json(successResponse('Category Created'));
};

const getCategories: IController = async (request, response) => {
  const categories = await _getCategories();

  return response
    .status(HTTP_STATUS_CODES.OK.code)
    .json(successResponse('Category List', categories));
};

const updateCategoryById: IController = async (request, response) => {
  const { _id, name, description } = request.body;

  await _updateCategoryById(_id, { name, description });

  return response
    .status(HTTP_STATUS_CODES.OK.code)
    .json(successResponse('Category Updated'));
};

const getCategoryById: IController = async (request, response) => {
  const { id } = request.body;
  const category = await _findCategoryById(id);

  return response
    .status(HTTP_STATUS_CODES.OK.code)
    .json(successResponse('Category Detail', category || {}));
};

export { createCategory, getCategories, getCategoryById, updateCategoryById };
