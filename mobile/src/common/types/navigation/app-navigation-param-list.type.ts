import { AppScreenName } from '~/common/enums/enums';

type AppNavigationParamList = {
  [AppScreenName.COURSES]: undefined;
  [AppScreenName.MENTORS]: undefined;
  [AppScreenName.MY_EDUCATION]: undefined;
  [AppScreenName.BILLING]: undefined;
  [AppScreenName.SETTINGS]: undefined;
  [AppScreenName.UAM]: undefined;
  [AppScreenName.UAM_GROUPS_CREATE]: undefined;
  [AppScreenName.UAM_GROUPS_EDIT]: undefined;
  [AppScreenName.ADD_COURSE]: undefined;
  [AppScreenName.COURSE]: undefined;
  [AppScreenName.EDIT_COURSE_CATEGORY]: undefined;
  [AppScreenName.INTERVIEWS]: undefined;
  [AppScreenName.CHOOSE_A_MENTOR]: undefined;
};

export { type AppNavigationParamList };
