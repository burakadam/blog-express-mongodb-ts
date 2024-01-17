import { HTTP_STATUS_CODES } from '@/constants/httpStatusCodes';
import { CustomError } from '@/utils/customError';
import { Request, Response } from 'express';
import mime from 'mime-types';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { postImage } from './asset';

interface IController {
  (request: Request, response: Response): unknown;
}

const createBlog = async (request: Request, response: Response) => {
  //   const { title, content, tags, category, poster } = request.body;
  // console.log('createBlog', request.body);
  const posterFile = request.file;
  let poster;

  if (posterFile) {
    const buffer = posterFile.buffer;
    const webpBuffer = await sharp(buffer).toFormat('webp').toBuffer();
    poster = { buffer: webpBuffer, mimetype: 'image/webp' };
  } else {
    throw CustomError(
      'poster is required',
      HTTP_STATUS_CODES.LENGTH_REQUIRED.code
    );
  }

  const posterName = uuidv4();

  try {
    await postImage(poster as { buffer: Buffer; mimetype: string }, posterName);
  } catch (error) {
    throw CustomError(
      'poster file type is wrong',
      HTTP_STATUS_CODES.UNSUPPORTED_MEDIA_TYPE.code
    );
  }

  const posterUrl = `https://${process.env.BUCKET_NAME}.s3.${
    process.env.BUCKET_REGION
  }.amazonaws.com/${posterName}.${mime.extension(poster.mimetype)}`;

  console.log({ ...request.body, poster: posterUrl });
};

export { createBlog };
