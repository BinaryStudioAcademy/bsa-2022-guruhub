import { AuthScreenName } from '~/common/enums/enums';

type AuthNavigationParamList = {
  [AuthScreenName.SIGN_UP]: undefined;
  [AuthScreenName.SIGN_IN]: undefined;
};

export { type AuthNavigationParamList };
