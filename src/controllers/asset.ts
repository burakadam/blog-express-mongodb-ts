import { s3 } from '@/config/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import 'dotenv/config';
import { Request, Response } from 'express';
import mime from 'mime-types';

interface IController {
  (request: Request, response: Response): unknown;
}

const postImage = async (
  file: { buffer: Buffer; mimetype: string },
  key: string
) => {
  console.log('file?.mimetype', file?.mimetype);
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Body: file?.buffer,
    ContentType: mime.extension(file?.mimetype) || file?.mimetype,
  });

  const sendImageResponse = await s3.send(command);
  console.log('sendImageResponse', sendImageResponse);

  // const s3ObjectURL = `https://${process.env.S3_BUCKET_NAME}.s3.[REGION].amazonaws.com/${userId}-profile-image.jpg`;

  return sendImageResponse;
};

export { postImage };
