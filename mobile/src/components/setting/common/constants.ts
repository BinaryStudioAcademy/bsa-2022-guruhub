import { ContentType, UserGender } from '~/common/enums/enums';
import { UserDetailsUpdateInfoRequestDto } from '~/common/types/types';

const SELECTION_LIMIT = 1;
const AVATAR_MAX_SIZE = 1000000; // 1MB
const FILE_FORMATS = [
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
  label: gender,
  value: gender,
}));

export {
  AVATAR_MAX_SIZE,
  DEFAULT_UPDATE_USER_DETAILS_PAYLOAD,
  FILE_FORMATS,
  GENDER_OPTIONS,
  SELECTION_LIMIT,
};
