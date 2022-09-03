import { ChatMessageCreateRequestBodyDto, FC } from 'common/types/types';
import { Input } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import { useAppForm } from 'hooks/hooks';
import { chatMessageCreateArguments as chatMessageCreateArgumentsValidationSchema } from 'validation-schemas/validation-schemas';

import { getDefaultMessagePayload } from './common';

type Props = {
  chatId: string | null;
  chatOpponentId: number;
};

const MessageForm: FC<Props> = ({ chatId, chatOpponentId }) => {
  const { control, errors } = useAppForm<ChatMessageCreateRequestBodyDto>({
    defaultValues: getDefaultMessagePayload(chatOpponentId, chatId),
    validationSchema: chatMessageCreateArgumentsValidationSchema,
  });

  return (
    <Input
      placeholder="Your message here"
      control={control}
      errors={errors}
      name={getNameOf<ChatMessageCreateRequestBodyDto>('message')}
      label=""
    />
  );
};

export { MessageForm };
