import { ChatMessageGetAllItemResponseDto } from '~/common/types/types';

const sortMessagesByDate = (
  messages: ChatMessageGetAllItemResponseDto[],
): ChatMessageGetAllItemResponseDto[] => {
  return messages.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
};

export { sortMessagesByDate };
