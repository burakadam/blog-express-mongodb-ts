import { HTTP_STATUS_CODES } from '@/constants/httpStatusCodes';
import { CustomError } from '@/utils/customError';
import { Request, Response } from 'express';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { postImage } from './asset';

interface IController {
  (request: Request, response: Response): unknown;
}

const createBlog = async (request: Request, response: Response) => {
  //   const { title, content, tags, category, poster } = request.body;
  const poster = request.file;
  let posterFile;

  if (poster) {
    const buffer = poster.buffer;
    posterFile = await sharp(buffer).toFormat('webp').toBuffer();
  }

  console.log('createBlog', request.body);

  const posterName = uuidv4();

  try {
    await postImage(
      (posterFile || poster) as { buffer: Buffer; mimetype: string },
      posterName
    );
  } catch (error) {
    throw CustomError(
      HTTP_STATUS_CODES.UNSUPPORTED_MEDIA_TYPE.text,
      HTTP_STATUS_CODES.UNSUPPORTED_MEDIA_TYPE.code
    );
  }

  const posterUrl = `https://${process.env.BUCKET_NAME}.s3.[REGION].amazonaws.com/${posterName}`;
};

export { createBlog };
