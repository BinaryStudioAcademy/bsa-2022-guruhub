import { HttpCode } from '~/common/enums/enums';

import { UserDetailsUpdateInfoRequestDto } from './user-details';

type UserDetailsWithStatusResponseDto = {
  status: HttpCode;
  userDetails: UserDetailsUpdateInfoRequestDto;
};

export { type UserDetailsWithStatusResponseDto };
