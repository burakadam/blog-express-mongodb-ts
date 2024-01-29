import { HTTP_STATUS_CODES } from '@/constants/httpStatusCodes';
import { postImage } from '@/controllers/asset';
import { CustomError } from '@/utils/customError';
import mime from 'mime-types';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

const saveImageToS3 = async (posterFile: Express.Multer.File | undefined) => {
  if (!posterFile) {
    throw CustomError(
      'poster is required',
      HTTP_STATUS_CODES.LENGTH_REQUIRED.code
    );
  }

  try {
    const buffer = posterFile.buffer;
    const webpBuffer = await sharp(buffer).toFormat('webp').toBuffer();
    const img = { buffer: webpBuffer, mimetype: 'image/webp' };
    const imgName = uuidv4();

    await postImage(img, imgName);

    const imgUrl = `https://${process.env.BUCKET_NAME}.s3.${
      process.env.BUCKET_REGION
    }.amazonaws.com/${imgName}.${mime.extension(img.mimetype)}`;

    return imgUrl;
  } catch (error) {
    console.error(`Error saving image to S3: ${error}`);
    throw CustomError(
      'poster file type is wrong',
      HTTP_STATUS_CODES.UNSUPPORTED_MEDIA_TYPE.code
    );
  }
};

export { saveImageToS3 };
