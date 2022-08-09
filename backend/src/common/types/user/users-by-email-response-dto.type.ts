type UsersByEmailResponseDto = {
  id: number;
  email: string;
  passwordHash: string;
  passwordSalt: string;
};

export { type UsersByEmailResponseDto };
