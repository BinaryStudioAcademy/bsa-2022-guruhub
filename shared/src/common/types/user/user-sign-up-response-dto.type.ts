type UserByIdResponse = {
  id: number;
  email: string;
};
type UserSignUpResponseDto = {
  token: string;
  user: UserByIdResponse;
};

export { type UserByIdResponse, type UserSignUpResponseDto };
