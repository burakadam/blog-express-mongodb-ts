import { s3 } from '@/config/s3';
import { HTTP_STATUS_CODES } from '@/constants/httpStatusCodes';
import { successResponse } from '@/utils/response';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import 'dotenv/config';
import { Request, Response } from 'express';

interface IController {
  (request: Request, response: Response): unknown;
}

const postImage: IController = async (request, response) => {
  console.log('request', request.file);
  const file = request.file;

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: file?.originalname,
    Body: file?.buffer,
    ContentType: file?.mimetype,
  });

  const sendImageResponse = await s3.send(command);
  console.log('sendImageResponse', sendImageResponse);

  return response
    .status(HTTP_STATUS_CODES.OK.code)
    .json(successResponse('Image send to s3'));
};

export { postImage };
