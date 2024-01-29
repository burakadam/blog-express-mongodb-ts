import { HTTP_STATUS_CODES } from '@/constants/httpStatusCodes';
import { _createBlog, _getBlogList } from '@/helpers/mongoose/blog';
import { saveBlogContentImagesToS3 } from '@/helpers/saveBlogContentImagesTos3';
import { saveImageToS3 } from '@/helpers/saveImageToS3';
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

export { createBlog, getBlogs };
