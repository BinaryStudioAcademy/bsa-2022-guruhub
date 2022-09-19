import React, { FC } from 'react';

import { AppColor } from '~/common/enums/enums';
import { ChatMessageFormRequestDto } from '~/common/types/types';
import { Icon, Input, Pressable, View } from '~/components/common/common';
import {
  useAppForm,
  useCallback,
  useEffect,
  useFocusEffect,
  useState,
} from '~/hooks/hooks';

import { ROWS_MAX_COUNT } from './common/constants/rows-max-count.constants';
import { getDefaultMessagePayload } from './helpers/helpers';
import { styles } from './styles';

type Props = {
  onSubmit: (payload: ChatMessageFormRequestDto) => void;
};

const MessageForm: FC<Props> = ({ onSubmit }) => {
  const { control, errors, handleSubmit, reset, watch } =
    useAppForm<ChatMessageFormRequestDto>({
      defaultValues: getDefaultMessagePayload(),
    });

  const [messageChar, setMessageChar] = useState<string>();
  const [rowsCount, setRowsCount] = useState<number>(1);

  const hitSlop = { top: 5, bottom: 5, left: 5, right: 5 };
  const messageFieldValue = watch('message');
  const hasError = Boolean(errors.message?.message);
  const isButtonDisabled = hasError || Boolean(!messageFieldValue.trim());

  const handleSend = (payload: ChatMessageFormRequestDto): void => {
    onSubmit(payload);
    reset({ message: '' });
    setRowsCount(1);
  };

  useEffect(() => {
    setMessageChar(watch.name);

    if (messageChar === '\n' && rowsCount < ROWS_MAX_COUNT) {
      setRowsCount(rowsCount + 1);
    }
  }, [messageChar]);

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
          rows={rowsCount}
        />
      </View>
      <Pressable
        onPress={handleSubmit(handleSend)}
        hitSlop={hitSlop}
        style={[styles.button, isButtonDisabled && styles.disabledButton]}
        disabled={isButtonDisabled}
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
