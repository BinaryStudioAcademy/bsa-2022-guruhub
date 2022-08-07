type UserSignUpResponseDto = {
  id: number;
  email: string;
};

type UserSignUpTokenResponseDto = {
  token: string;
  user: UserSignUpResponseDto;
};

export { type UserSignUpResponseDto, type UserSignUpTokenResponseDto };
