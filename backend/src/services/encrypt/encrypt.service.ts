import bcrypt from 'bcrypt';

class Encrypt {
  async comparePasswords(
    passwordHash: string,
    password: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }
}

export { Encrypt };
