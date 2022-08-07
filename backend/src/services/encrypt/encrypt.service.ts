import bcrypt from 'bcrypt';

class Encrypt {
  async createHash(data: string, salt: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(data, salt);
    return hashedPassword;
  }

  public async compare(
    data: string,
    encryptionData: { salt: string; passwordHash: string },
  ): Promise<boolean> {
    const hash = await this.createHash(data, encryptionData.salt);

    return hash === encryptionData.passwordHash;
  }
}

export { Encrypt };
