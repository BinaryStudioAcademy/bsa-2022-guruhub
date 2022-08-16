import { genSalt, hash } from 'bcrypt';

import { EncryptionData } from '~/common/types/types';

type Constructor = {
  salt: number;
};

class Encrypt {
  #salt: number;

  public constructor({ salt }: Constructor) {
    this.#salt = salt;
  }

  public generateSalt(): Promise<string> {
    return genSalt(this.#salt);
  }

  public encrypt(password: string, salt: string): Promise<string> {
    return hash(password, salt);
  }

  public async compare(encryptionData: EncryptionData): Promise<boolean> {
    const hash = await this.encrypt(encryptionData.data, encryptionData.salt);

    return hash === encryptionData.passwordHash;
  }
}

export { Encrypt };
