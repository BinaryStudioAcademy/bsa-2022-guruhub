import React, { FC } from 'react';

import { ChatMessageFormRequestDto } from '~/common/types/types';
import { Input, View } from '~/components/common/common';
import {
  useAppForm,
  useCallback,
  useEffect,
  useFocusEffect,
  useState,
} from '~/hooks/hooks';
import { chatMessageCreate } from '~/validation-schemas/validation-schemas';

import { ROWS_MAX_COUNT } from './common/constants/rows-max-count.constants';
import { SendButton } from './components/components';
import { getDefaultMessagePayload } from './helpers/helpers';
import { styles } from './styles';

type Props = {
  onSubmit: (payload: ChatMessageFormRequestDto) => void;
};

const MessageForm: FC<Props> = ({ onSubmit }) => {
  const { control, errors, handleSubmit, reset, watch } =
    useAppForm<ChatMessageFormRequestDto>({
      defaultValues: getDefaultMessagePayload(),
      validationSchema: chatMessageCreate,
    });

  const [messageChar, setMessageChar] = useState<string>();
  const [rowsCount, setRowsCount] = useState<number>(1);

  const hasError = Boolean(errors.message?.message);

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
      <SendButton onPress={handleSubmit(handleSend)} isDisabled={hasError} />
    </View>
  );
};

export { MessageForm };
