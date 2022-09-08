import { ChatMessageGetAllItemResponseDto } from 'common/types/types';
import { getFormattedDate } from 'helpers/helpers';

type DateToMessagesMap = {
  [key: string]: ChatMessageGetAllItemResponseDto[];
};

const groupMessagesByDate = (
  messages: ChatMessageGetAllItemResponseDto[],
): DateToMessagesMap => {
  const groupedByDateMessages = messages.reduce<DateToMessagesMap>(
    (dateToMessages, message) => {
      const formattedMessageDate = getFormattedDate(
        message.createdAt,
        'yyyy-MM-dd',
      );

      return {
        ...dateToMessages,
        [formattedMessageDate]: (
          dateToMessages?.[formattedMessageDate] ?? []
        ).concat(message),
      };
    },
    {},
  );

  return groupedByDateMessages;
};

export { groupMessagesByDate };
