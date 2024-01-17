import { HTTP_STATUS_CODES } from '@/constants/httpStatusCodes';
import { postImage } from '@/controllers/asset';
import { CustomError } from '@/utils/customError';
import mime from 'mime-types';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

const saveImageToS3 = async (posterFile: Express.Multer.File | undefined) => {
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

  return posterUrl;
};

export { saveImageToS3 };
