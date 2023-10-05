import { Request, Response } from 'express';
import { createUserHelper } from '../helpers/user';
import { createHashedPassword } from '../utils/password';

interface IController {
  (request: Request, response: Response): unknown;
}

const createUser: IController = async (request, response) => {
  try {
    const { email, password } = request.body;
    const hashedPassword = await createHashedPassword(password);

    const user = await createUserHelper({ email, password: hashedPassword });

    response.status(201).json({
      success: true,
      message: 'User Created',
      user,
    });
  } catch (error) {
    //NOTE handle error message
    response.status(500).json({ success: false, message: error });
  }
};

export { createUser };
