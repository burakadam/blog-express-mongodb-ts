import { Request, Response } from 'express';
import { createUserHelper } from '../helpers/User';

interface IController {
  (request: Request, response: Response): unknown;
}

const createUser: IController = async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = await createUserHelper({ email, password });

    response.status(201).json({
      success: true,
      message: 'User Created',
      user,
    });
  } catch (error) {
    if (error === 1100)
      response.status(409).json({
        success: false,
        message: 'User already in use',
      });
    response.status(500).json({ success: false, message: error });
  }
};

export { createUser };
