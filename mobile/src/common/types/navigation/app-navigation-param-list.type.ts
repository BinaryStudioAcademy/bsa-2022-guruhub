import { AppScreenName } from '~/common/enums/enums';

type AppNavigationParamList = {
  [AppScreenName.OVERVIEW]: undefined;
  [AppScreenName.COURSES]: undefined;
  [AppScreenName.MENTORS]: undefined;
  [AppScreenName.MY_EDUCATION]: undefined;
  [AppScreenName.BILLING]: undefined;
  [AppScreenName.SETTINGS]: undefined;
};

export { type AppNavigationParamList };
