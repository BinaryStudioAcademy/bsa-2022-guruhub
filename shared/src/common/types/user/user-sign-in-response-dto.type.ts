import { UsersByIdResponseDto } from './users-by-id-response-dto.type';

type UserSignInResponseDto = {
  token: string;
  user: UsersByIdResponseDto;
};

export { type UserSignInResponseDto };
