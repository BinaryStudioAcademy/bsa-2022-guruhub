import { ChatMessageCreateRequestBodyDto, FC } from 'common/types/types';
import { Input } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import { useAppDispatch, useAppForm } from 'hooks/hooks';
import { chatsActions } from 'store/actions';
import { chatMessageCreateArguments as chatMessageCreateArgumentsValidationSchema } from 'validation-schemas/validation-schemas';

import { getDefaultMessagePayload } from './helpers/get-default-message-payload.helper';

type Props = {
  chatId: string | null;
  chatOpponentId: number;
};

const MessageForm: FC<Props> = ({ chatId, chatOpponentId }) => {
  const dispatch = useAppDispatch();

  const { control, errors, handleSubmit } =
    useAppForm<ChatMessageCreateRequestBodyDto>({
      defaultValues: getDefaultMessagePayload(chatOpponentId, chatId),
      validationSchema: chatMessageCreateArgumentsValidationSchema,
    });

  const handleMessageSubmit = (
    payload: ChatMessageCreateRequestBodyDto,
  ): void => {
    dispatch(chatsActions.createMessage(payload));
  };

  return (
    <form onSubmit={handleSubmit(handleMessageSubmit)}>
      <Input
        placeholder="Your message here"
        control={control}
        errors={errors}
        name={getNameOf<ChatMessageCreateRequestBodyDto>('message')}
        label=""
      />
    </form>
  );
};

export { MessageForm };
