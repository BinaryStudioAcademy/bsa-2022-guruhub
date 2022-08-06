import { genSalt } from 'bcrypt';
import { USER_PASSWORD_SALT_ROUNDS } from '~/common/constants/constants';

const generateSalt = (): Promise<string> => {
  return genSalt(USER_PASSWORD_SALT_ROUNDS);
};

export { generateSalt };
