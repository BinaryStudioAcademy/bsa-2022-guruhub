import React, { FC } from 'react';

import { AppColor } from '~/common/enums/enums';
import { ChatMessageFormRequestDto } from '~/common/types/types';
import { Icon, Input, Pressable, View } from '~/components/common/common';
import { useAppForm, useCallback, useFocusEffect } from '~/hooks/hooks';
import { chatMessageCreate } from '~/validation-schemas/validation-schemas';

import { getDefaultMessagePayload } from './helpers/helpers';
import { styles } from './styles';

type Props = {
  onSubmit: (payload: ChatMessageFormRequestDto) => void;
};

const MessageForm: FC<Props> = ({ onSubmit }) => {
  const { control, errors, handleSubmit, reset } =
    useAppForm<ChatMessageFormRequestDto>({
      defaultValues: getDefaultMessagePayload(),
      validationSchema: chatMessageCreate,
    });

  const hitSlop = { top: 5, bottom: 5, left: 5, right: 5 };
  const hasError = Boolean(errors.message?.message);

  const handleSend = (payload: ChatMessageFormRequestDto): void => {
    onSubmit(payload);
    reset({ message: '' });
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        reset({ message: '' });
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
          rows={3}
        />
      </View>
      <Pressable
        onPress={handleSubmit(handleSend)}
        hitSlop={hitSlop}
        style={[styles.button, hasError && styles.disabledButton]}
        disabled={hasError}
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
