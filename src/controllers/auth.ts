import { Request, Response } from 'express';
import { findUserByEmailHelper } from '../helpers/user';
import { compareHashedPassword } from '../utils/password';

const login = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const user = await findUserByEmailHelper(email);

    if (!user) {
      return response
        .status(401)
        .json({ success: false, message: 'Invalid email' });
    }

    const isPasswordValid = compareHashedPassword(password, user.password);

    if (!isPasswordValid) {
      return response
        .status(401)
        .json({ success: false, message: 'Invalid password' });
    }

    response.status(201).json({
      success: true,
      message: 'Login successfully.',
      user,
    });
  } catch (error) {
    //NOTE handle error message
    response.status(500).json({ success: false, message: error });
  }
};

export { login };
