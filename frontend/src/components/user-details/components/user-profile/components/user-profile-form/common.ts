import { UserGender } from 'common/enums/enums';
import { UserDetailsUpdateInfoRequestDto } from 'common/types/types';

const DEFAULT_UPDATE_USER_DETAILS_PAYLOAD: UserDetailsUpdateInfoRequestDto = {
  fullName: '',
  gender: UserGender.MALE,
  dateOfBirth: null,
};

const MIN_USER_AGE = 13;

export { DEFAULT_UPDATE_USER_DETAILS_PAYLOAD, MIN_USER_AGE };
