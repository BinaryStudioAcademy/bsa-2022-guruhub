import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { ChatScreenName } from '~/common/enums/enums';
import { CoursesNavigationItem } from '~/common/types/types';
import { Chat } from '~/components/chat/chat';
import { EmptyChats } from '~/components/chat/components/components';
import { ChatConversation } from '~/components/chat-conversation/chat-conversation';

const SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
  headerShown: false,
};

const CHAT_SCREENS: CoursesNavigationItem[] = [
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

export { CHAT_SCREENS, SCREEN_OPTIONS };
