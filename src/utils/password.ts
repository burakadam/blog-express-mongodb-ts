// NOTE: check other password hashed methods

import bcrypt from 'bcrypt';

const saltRounds = 10;

const createHashedPassword = (password: string | Buffer): Promise<string> =>
  bcrypt.hash(password, saltRounds);

const compareHashedPassword = async (
  password: string,
  selectedPassword: string
): Promise<boolean> => bcrypt.compare(password, selectedPassword);

export { compareHashedPassword, createHashedPassword };
