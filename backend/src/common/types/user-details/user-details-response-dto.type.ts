import { HttpCode } from '~/common/enums/enums';

import { UserDetailsCreateRequestDto } from './user-details';

type UserDetailsResponseDto = {
  status: HttpCode;
  userDetails: UserDetailsCreateRequestDto;
};

export { type UserDetailsResponseDto };
