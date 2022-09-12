import { ChatMessageCreateRequestBodyDto, FC } from 'common/types/types';
import { Button, Input } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import { useAppDispatch, useAppForm } from 'hooks/hooks';
import { chatsActions } from 'store/actions';
import { chatMessageCreateArguments as chatMessageCreateArgumentsValidationSchema } from 'validation-schemas/validation-schemas';

import { getDefaultMessagePayload } from './helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  chatId: string | null;
  chatOpponentId: number;
};

const INITIAL_TEXT_AREA_ROWS = 1;

const MessageForm: FC<Props> = ({ chatId, chatOpponentId }) => {
  const dispatch = useAppDispatch();

  const { control, errors, handleSubmit, reset } =
    useAppForm<ChatMessageCreateRequestBodyDto>({
      defaultValues: getDefaultMessagePayload(chatOpponentId, chatId),
      validationSchema: chatMessageCreateArgumentsValidationSchema,
    });

  const handleMessageSubmit = (
    payload: ChatMessageCreateRequestBodyDto,
  ): void => {
    dispatch(chatsActions.createMessage(payload));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleMessageSubmit)}
      className={styles.messageForm}
    >
      <Input
        placeholder="Your message here"
        control={control}
        errors={errors}
        name={getNameOf<ChatMessageCreateRequestBodyDto>('message')}
        label="Chat message"
        rows={INITIAL_TEXT_AREA_ROWS}
        hasVisuallyHiddenLabel
      />
      <Button
        className={styles.submitButton}
        label="Send"
        type="submit"
        btnColor="blue"
      />
    </form>
  );
};

export { MessageForm };
