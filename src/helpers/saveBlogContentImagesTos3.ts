//NOTE: WRITE PROPER INTERFACE FOR LEXICAL STATE

import { HTTP_STATUS_CODES } from '@/constants/httpStatusCodes';
import { postImage } from '@/controllers/asset';
import { CustomError } from '@/utils/customError';
import mime from 'mime-types';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

// NOTE: WRITE PROPER EXICAL STATE INTERFACE
interface Content {
  root: {
    children: Array<{
      children: Array<{
        type: string; // Add other properties as needed
        src?: string; // Add other optional properties as needed
        // Add other properties based on your content structure
      }>;
      // Add other properties based on your content structure
    }>;
    // Add other properties based on your content structure
  };
  // Add other properties based on your content structure
}

const saveBlogContentImagesToS3 = async (content: Content) => {
  const childs = content.root.children;

  for (let index = 0; index < childs.length; index++) {
    const child = childs[index];

    for (let i = 0; i < child.children.length; i++) {
      const el = child.children[i];

      if (el.type === 'image' && el.src) {
        try {
          const buffer = Buffer.from(
            el.src.replace(/^data:image\/\w+;base64,/, ''),
            'base64'
          );
          const webpBuffer = await sharp(buffer).toFormat('webp').toBuffer();
          const img = { buffer: webpBuffer, mimetype: 'image/webp' };
          const imgName = uuidv4();

          await postImage(img, imgName);

          const imgURL = `https://${process.env.BUCKET_NAME}.s3.${
            process.env.BUCKET_REGION
          }.amazonaws.com/${imgName}.${mime.extension(img.mimetype)}`;

          child.children[i].src = imgURL;
        } catch (error) {
          throw CustomError(
            `Error processing image at index ${i}`,
            HTTP_STATUS_CODES.UNSUPPORTED_MEDIA_TYPE.code
          );
        }
      }
    }
  }

  return content;
};

export { saveBlogContentImagesToS3 };
