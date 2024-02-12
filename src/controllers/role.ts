import { Request, Response } from 'express';

interface IController {
  (request: Request, response: Response): unknown;
}

const createRole: IController = async (request, response) => {
  const { name, premissions } = request.body;

  console.log(name, premissions);
};

export { createRole };
