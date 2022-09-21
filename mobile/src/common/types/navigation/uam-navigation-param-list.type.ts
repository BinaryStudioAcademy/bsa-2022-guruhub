import { UamScreenName } from '~/common/enums/enums';

type UamNavigationParamList = {
  [UamScreenName.UAM]: undefined;
  [UamScreenName.UAM_GROUPS_CREATE]: undefined;
  [UamScreenName.UAM_GROUPS_EDIT]: undefined;
};

export { type UamNavigationParamList };
