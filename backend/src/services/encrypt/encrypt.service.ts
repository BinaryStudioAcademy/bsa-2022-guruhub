import bcrypt from 'bcrypt';

class Encrypt {
  async comparePasswords(
    passwordHash: string,
    password: string,
  ): Promise<boolean> {
    let res = false;

    bcrypt.compare(password, passwordHash, (_err, result) => {
      if (result) {
        res = true;
      }
    });

    return res;
  }
}

export { Encrypt };
