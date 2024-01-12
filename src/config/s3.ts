import { S3Client } from '@aws-sdk/client-s3';
import 'dotenv/config';

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY!,
    secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY!,
  },
  region: process.env.BUCKET_REGION!,
});

export { s3 };
