import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

const TOKEN_EXPIRE_TIME = '2h';
const CONFIG_TOKEN = process.env.TOKEN_KEY!;

const createToken = (id: Types.ObjectId, email: string) =>
  jwt.sign({ user_id: id, email }, CONFIG_TOKEN, {
    expiresIn: TOKEN_EXPIRE_TIME,
  });

const verifyToken = (token: string) => jwt.verify(token, CONFIG_TOKEN);

export { createToken, verifyToken };
