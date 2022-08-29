import { UserGender } from '~/common/enums/enums';

type UserDetailsItemResponseDto = {
  avatarUrl: string | null;
  createdAt: string;
  dateOfBirth: string | null;
  fullName: string;
  gender: UserGender | null;
  id: number;
  userId: number;
};

export { type UserDetailsItemResponseDto };
