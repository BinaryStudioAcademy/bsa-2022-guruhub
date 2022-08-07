import { genSalt, hash } from 'bcrypt';
import { EncryptionData } from '~/common/types/types';

type Constructor = {
  salt: number;
};

class Encrypt {
  #salt: number;

  constructor({ salt }: Constructor) {
    this.#salt = salt;
  }

  generateSalt(): Promise<string> {
    return genSalt(this.#salt);
  }

  encrypt(password: string, salt: string): Promise<string> {
    return hash(password, salt);
  }

  async compare(encryptionData: EncryptionData): Promise<boolean> {
    const hash = await this.encrypt(encryptionData.data, encryptionData.salt);

    return hash === encryptionData.passwordHash;
  }
}

export { Encrypt };
