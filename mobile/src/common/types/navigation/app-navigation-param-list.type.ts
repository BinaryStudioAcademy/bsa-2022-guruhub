import { AppScreenName } from '~/common/enums/enums';

type AppNavigationParamList = {
  [AppScreenName.COURSES]: undefined;
  [AppScreenName.MY_COURSES]: undefined;
  [AppScreenName.BILLING]: undefined;
  [AppScreenName.SETTINGS]: undefined;
  [AppScreenName.UAM]: undefined;
  [AppScreenName.INTERVIEWS]: undefined;
  [AppScreenName.CHAT]: undefined;
  [AppScreenName.COURSE_MANAGEMENT]: undefined;
};

export { type AppNavigationParamList };
