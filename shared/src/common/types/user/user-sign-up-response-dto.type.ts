import { UsersByIdResponseDto } from './users-by-id-response-dto.type';

type UserSignUpResponseDto = {
  token: string;
  user: UsersByIdResponseDto;
};

export { type UserSignUpResponseDto };
