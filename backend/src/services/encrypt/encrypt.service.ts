import { genSalt, hash } from 'bcrypt';
import { USER_PASSWORD_SALT_ROUNDS } from '~/common/constants/constants';

class Encrypt {
  generateSalt(): Promise<string> {
    return genSalt(USER_PASSWORD_SALT_ROUNDS);
  }

  encrypt(password: string, salt: string): Promise<string> {
    return hash(password, salt);
  }
}

export { Encrypt };
