import { HTTP_STATUS_CODES } from '@/constants/httpStatusCodes';
import {
  _createBlog,
  _findBlogById,
  _getBlogList,
  _updateBlogById,
} from '@/helpers/mongoose/blog';
import { _getCategoryList } from '@/helpers/mongoose/category';
import { saveBlogContentImagesToS3 } from '@/helpers/saveBlogContentImagesTos3';
import { saveImageToS3 } from '@/helpers/saveImageToS3';
import { CustomError } from '@/utils/customError';
import { successResponse } from '@/utils/response';
import { verifyToken } from '@/utils/token';
import { Request, Response } from 'express';

interface IController {
  (request: Request, response: Response): unknown;
}

const createBlog = async (request: Request, response: Response) => {
  const params = request.body;
  const token = request.headers['x-access-token'] as string;
  const user_id = verifyToken(token);

  const posterUrl = await saveImageToS3(request.file);
  const updatedImgsContent = await saveBlogContentImagesToS3(
    JSON.parse(params.content)
  );

  const blogParams = {
    ...params,
    content: JSON.stringify(updatedImgsContent),
    poster: posterUrl,
    author: user_id,
    viewCount: 0,
    ...(params.tags && { tags: params.tags.split(',') }),
  };

  await _createBlog(blogParams);

  return response
    .status(HTTP_STATUS_CODES.CREATED.code)
    .json(successResponse('Blog Created'));
};

const getBlogs = async (request: Request, response: Response) => {
  const { page, pageSize } = request.body;

  const blogs = await _getBlogList(page, pageSize);

  return response
    .status(HTTP_STATUS_CODES.OK.code)
    .json(successResponse('Blog List', blogs));
};

const getBlogById: IController = async (
  request: Request,
  response: Response
) => {
  const { _id } = request.body;
  const blog = await _findBlogById(_id);

  if (!blog)
    throw CustomError('Blog not found', HTTP_STATUS_CODES.NOT_FOUND.code);

  const categories = await _getCategoryList();

  if (!categories)
    throw CustomError('No Category found', HTTP_STATUS_CODES.NOT_FOUND.code);

  return response.status(HTTP_STATUS_CODES.OK.code).json(
    successResponse(
      'Blog Detail',
      {
        blog,
        categories,
      } || {}
    )
  );
};

const updateBlogById: IController = async (request, response) => {
  const params = request.body;
  const token = request.headers['x-access-token'] as string;
  const user_id = verifyToken(token);
  let poster;

  if (request.file) poster = await saveImageToS3(request.file);
  else poster = params.poster;

  const updatedImgsContent = await saveBlogContentImagesToS3(
    JSON.parse(params.content)
  );

  const blogParams = {
    ...params,
    content: JSON.stringify(updatedImgsContent),
    poster: poster,
    author: user_id,
    ...(params.tags && { tags: params.tags.split(',') }),
  };

  const blog = await _updateBlogById(params.id, blogParams);

  if (!blog)
    throw CustomError('Blog not found', HTTP_STATUS_CODES.NOT_FOUND.code);

  return response
    .status(HTTP_STATUS_CODES.OK.code)
    .json(successResponse('Blog Updated'));
};

export { createBlog, getBlogById, getBlogs, updateBlogById };
