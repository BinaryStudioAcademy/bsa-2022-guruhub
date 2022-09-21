import { ChatScreenName } from '~/common/enums/enums';

type ChatNavigationParamList = {
  [ChatScreenName.CHAT]: undefined;
  [ChatScreenName.ALL_CHATS]: undefined;
  [ChatScreenName.CONVERSATION]: undefined;
};

export { type ChatNavigationParamList };
