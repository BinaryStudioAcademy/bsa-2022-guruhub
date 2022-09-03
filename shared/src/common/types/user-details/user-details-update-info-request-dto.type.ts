import { UserGender } from '~/common/enums/enums';

type UserDetailsUpdateInfoRequestDto = {
  fullName: string;
  gender: UserGender | null;
  dateOfBirth: string | null;
};

export { type UserDetailsUpdateInfoRequestDto };
