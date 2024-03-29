import { ContentType, UserGender } from '~/common/enums/enums';
import { UserDetailsUpdateInfoRequestDto } from '~/common/types/types';
import { capitalize } from '~/helpers/helpers';

const SELECTION_LIMIT = 1;
const AVATAR_MAX_SIZE = 1000000; // 1MB
const AVATAR_FILE_FORMATS = [
  ContentType.IMAGE_JPEG,
  ContentType.IMAGE_PNG,
  ContentType.IMAGE_SVG,
];

const DEFAULT_UPDATE_USER_DETAILS_PAYLOAD: UserDetailsUpdateInfoRequestDto = {
  fullName: '',
  gender: UserGender.MALE,
  dateOfBirth: null,
  telegramUsername: '',
};

const GENDER_OPTIONS = Object.values(UserGender).map((gender) => ({
  label: capitalize(gender),
  value: gender,
}));

export {
  AVATAR_FILE_FORMATS,
  AVATAR_MAX_SIZE,
  DEFAULT_UPDATE_USER_DETAILS_PAYLOAD,
  GENDER_OPTIONS,
  SELECTION_LIMIT,
};
