import { RootScreenName } from '~/common/enums/enums';

type RootNavigationParamList = {
  [RootScreenName.SIGN_UP]: undefined;
  [RootScreenName.SIGN_IN]: undefined;
  [RootScreenName.COURSES]: undefined; //refactor
};

export { type RootNavigationParamList };
