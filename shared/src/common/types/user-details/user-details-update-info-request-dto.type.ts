import { UserGender } from '~/common/enums/enums';

type UserDetailsUpdateInfoRequestDto = {
  fullName: string;
  gender: typeof UserGender | null;
  dateOfBirth: string | null;
};

export { type UserDetailsUpdateInfoRequestDto };
