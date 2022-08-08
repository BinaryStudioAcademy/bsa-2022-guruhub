type UserByEmailDto = {
  id: number;
  email: string;
  fullName: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
};

export { type UserByEmailDto };
