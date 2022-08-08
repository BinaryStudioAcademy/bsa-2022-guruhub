import { UserByIdResponse } from '../types';

type UserSignInResponseDto = {
  token: string;
  user: UserByIdResponse;
};

export { type UserSignInResponseDto };
