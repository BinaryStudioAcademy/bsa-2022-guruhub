import { genSalt, hash } from 'bcrypt';
import { USER_PASSWORD_SALT_ROUNDS } from '~/common/constants/constants';

class Encrypt {
  async generateSalt(): Promise<string> {
    return await genSalt(USER_PASSWORD_SALT_ROUNDS);
  }

  async encrypt(password: string, salt: string): Promise<string> {
    return await hash(password, salt);
  }
}

export { Encrypt };
