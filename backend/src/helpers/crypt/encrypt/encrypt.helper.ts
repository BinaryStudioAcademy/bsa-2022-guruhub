import { hash } from 'bcrypt';

const encrypt = (password: string, salt: string): Promise<string> => {
  return hash(password, salt);
};
export { encrypt };
