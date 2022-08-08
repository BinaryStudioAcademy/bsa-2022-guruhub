type UserByIdResponse = {
  id: number;
  email: string;
  fullName: string;
  createdAt: string;
};

type UserSignUpResponseDto = {
  token: string;
  user: UserByIdResponse;
};

export { type UserByIdResponse, type UserSignUpResponseDto };
