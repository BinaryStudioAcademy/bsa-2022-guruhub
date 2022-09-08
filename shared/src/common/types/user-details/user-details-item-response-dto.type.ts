import { UserGender } from '~/common/enums/enums';

import { FileGetResponseDto } from '../types';

type UserDetailsItemResponseDto = {
  avatar: FileGetResponseDto | null;
  createdAt: string;
  dateOfBirth: string | null;
  fullName: string;
  gender: UserGender | null;
  id: number;
  userId: number;
  telegramUsername: string | null;
};

export { type UserDetailsItemResponseDto };
