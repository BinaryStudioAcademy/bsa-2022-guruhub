import { ChatMessageGetAllItemResponseDto } from 'common/types/types';

const sortChatsByDate = (
  chatsItems: ChatMessageGetAllItemResponseDto[],
): ChatMessageGetAllItemResponseDto[] => {
  return [...chatsItems].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
};

export { sortChatsByDate };
