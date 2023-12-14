import { HTTP_STATUS_CODES } from '@/constants/httpStatusCodes';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { CustomError } from './customError';

const TOKEN_EXPIRE_TIME = '2h';
const CONFIG_TOKEN = process.env.TOKEN_KEY!;

interface IDecodedToken {
  user_id: string;
  email: string;
}

const createToken = (id: Types.ObjectId, email: string) =>
  jwt.sign({ user_id: id, email }, CONFIG_TOKEN, {
    expiresIn: TOKEN_EXPIRE_TIME,
  });

const verifyToken = (token: string) => {
  try {
    const decodedToken = jwt.verify(token, CONFIG_TOKEN) as IDecodedToken;
    const userId = decodedToken.user_id;
    return userId;
  } catch (error) {
    const { code, text } = HTTP_STATUS_CODES.UNAUTHORIZED;
    throw CustomError(text, code);
  }
};
export { createToken, verifyToken };
