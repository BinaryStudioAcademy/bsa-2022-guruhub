import { AppScreenName } from '~/common/enums/enums';

type AppNavigationParamList = {
  [AppScreenName.COURSES]: undefined;
  [AppScreenName.MY_COURSES]: undefined;
  [AppScreenName.BILLING]: undefined;
  [AppScreenName.SETTINGS]: undefined;
  [AppScreenName.UAM]: undefined;
  [AppScreenName.UAM_GROUPS_CREATE]: undefined;
  [AppScreenName.UAM_GROUPS_EDIT]: undefined;
  [AppScreenName.ADD_COURSE]: undefined;
  [AppScreenName.COURSE]: undefined;
  [AppScreenName.EDIT_COURSE]: undefined;
  [AppScreenName.INTERVIEWS]: undefined;
  [AppScreenName.INTERVIEW]: undefined;
  [AppScreenName.COURSE_MODULE]: undefined;
  [AppScreenName.CHAT]: undefined;
  [AppScreenName.ALL_CHATS]: undefined;
  [AppScreenName.CONVERSATION]: undefined;
  [AppScreenName.COURSE_MANAGEMENT]: undefined;
  [AppScreenName.TASK]: undefined;
};

export { type AppNavigationParamList };
