import React, { FC, ReactElement } from 'react';

import { AppScreenName } from '~/common/enums/enums';
import { UsersGetResponseDto, UserWithPermissions } from '~/common/types/types';
import { BackButton, FlatList, View } from '~/components/common/common';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useEffect,
} from '~/hooks/hooks';
import { chatActions } from '~/store/actions';

import { Conversation } from '../conversations-list/components/components';
import { styles } from './styles';

const EmptyChats: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigate();
  const { user, emptyChats } = useAppSelector(({ auth, chat }) => ({
    user: auth.user,
    emptyChats: chat.emptyChats,
  }));

  const userId = (user as UserWithPermissions).id;

  const handleChatMessagesLoad = (
    chatId: string,
    chatOpponent: UsersGetResponseDto,
  ): void => {
    dispatch(chatActions.getMessages({ id: chatId, chatOpponent }));
    navigation.navigate(AppScreenName.CONVERSATION);
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={(): void => navigation.navigate(AppScreenName.CHAT)}
        />
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={emptyChats}
        keyExtractor={({ receiver }): string =>
          receiver.userDetails.id.toString()
        }
        renderItem={({ item: chat, index }): ReactElement => {
          return (
            <Conversation
              key={index}
              chatId={chat.chatId}
              chatOpponent={chat.receiver}
              currentUserId={userId}
              messageSenderId={userId}
              onPress={handleChatMessagesLoad}
            />
          );
        }}
      />
    </View>
  );
};

export { EmptyChats };
