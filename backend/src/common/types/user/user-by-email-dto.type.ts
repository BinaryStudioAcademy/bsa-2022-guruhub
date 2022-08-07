type UserByEmailDto = {
  id: number;
  email: string;
  passwordHash: string;
  passwordSalt: string;
};

export { type UserByEmailDto };
