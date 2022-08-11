import { ApiPath, AuthApiPath, ENV } from '../enums/enums';

const WHITE_ROUTES = [
  `${ENV.API.V1_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
  `${ENV.API.V1_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
];

export { WHITE_ROUTES };
