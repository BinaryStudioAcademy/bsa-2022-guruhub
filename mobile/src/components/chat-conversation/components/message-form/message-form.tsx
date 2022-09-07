import React, { FC } from 'react';

import { AppColor } from '~/common/enums/enums';
import { ChatMessageCreateRequestBodyDto } from '~/common/types/types';
import { Icon, Input, Pressable, View } from '~/components/common/common';
import { useAppForm, useCallback, useFocusEffect } from '~/hooks/hooks';
import { chatMessageCreateArguments } from '~/validation-schemas/validation-schemas';

import { getDefaultMessagePayload } from './helpers/helpers';
import { styles } from './styles';

type Props = {
  chatId: string | null;
  chatOpponentId: number;
  onSubmit: (payload: ChatMessageCreateRequestBodyDto) => void;
};

const MessageForm: FC<Props> = ({ chatId, chatOpponentId, onSubmit }) => {
  const { control, errors, handleSubmit, reset } =
    useAppForm<ChatMessageCreateRequestBodyDto>({
      defaultValues: getDefaultMessagePayload(chatOpponentId, chatId),
      validationSchema: chatMessageCreateArguments,
    });

  const hitSlop = { top: 5, bottom: 5, left: 5, right: 5 };

  useFocusEffect(
    useCallback(() => {
      return () => {
        reset(getDefaultMessagePayload(chatOpponentId, chatId));
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Input
          placeholder="Type a message"
          name="message"
          control={control}
          errors={errors}
        />
      </View>
      <Pressable
        onPress={handleSubmit(onSubmit)}
        hitSlop={hitSlop}
        style={styles.button}
      >
        <Icon
          color={AppColor.BRAND.BLUE_100}
          width={25}
          height={25}
          name="send"
        />
      </Pressable>
    </View>
  );
};

export { MessageForm };
