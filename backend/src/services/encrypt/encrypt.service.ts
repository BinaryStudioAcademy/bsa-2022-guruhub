import { genSalt, hash } from 'bcrypt';

class Encrypt {
  #salt: number;
  constructor(saltRounds: number) {
    this.#salt = saltRounds;
  }
  generateSalt(): Promise<string> {
    return genSalt(this.#salt);
  }

  encrypt(password: string, salt: string): Promise<string> {
    return hash(password, salt);
  }
}

export { Encrypt };
