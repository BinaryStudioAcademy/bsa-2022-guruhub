import { genSalt, hash } from 'bcrypt';

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
}

export { Encrypt };
