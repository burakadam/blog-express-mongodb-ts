import { HTTP_STATUS_CODES } from '@/constants/httpStatusCodes';
import { _createBlog } from '@/helpers/mongoose/blog';
import { saveImageToS3 } from '@/helpers/saveImageToS3';
import { successResponse } from '@/utils/response';
import { verifyToken } from '@/utils/token';
import { Request, Response } from 'express';

interface IController {
  (request: Request, response: Response): unknown;
}

const createBlog = async (request: Request, response: Response) => {
  //   const { title, content, tags, category, poster } = request.body;
  // console.log('createBlog', request.body);
  const params = request.body;
  const token = request.headers['x-access-token'] as string;
  const user_id = verifyToken(token);

  const posterUrl = saveImageToS3(request.file);

  const blogParams = {
    ...params,
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

export { createBlog };
