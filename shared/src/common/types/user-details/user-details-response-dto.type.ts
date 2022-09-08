import { UserGender } from '~/common/enums/enums';

import { FileGetResponseDto } from '../types';

type UserDetailsResponseDto = {
  id: number;
  fullName: string;
  gender: UserGender | null;
  avatar: FileGetResponseDto | null;
  dateOfBirth: string | null;
  telegramUsername: string | null;
};

export { type UserDetailsResponseDto };
