import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { ChatScreenName } from '~/common/enums/enums';
import { NavigationItem } from '~/common/types/types';
import { Chat } from '~/components/chat/chat';
import { EmptyChats } from '~/components/chat/components/components';
import { ChatConversation } from '~/components/chat-conversation/chat-conversation';

const SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
  headerShown: false,
};

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    name: ChatScreenName.CHAT,
    component: Chat,
    permissions: [],
    isAuthRequired: true,
  },
  {
    name: ChatScreenName.CONVERSATION,
    component: ChatConversation,
    permissions: [],
    isAuthRequired: true,
  },
  {
    name: ChatScreenName.ALL_CHATS,
    component: EmptyChats,
    permissions: [],
    isAuthRequired: true,
  },
];

export { NAVIGATION_ITEMS, SCREEN_OPTIONS };
