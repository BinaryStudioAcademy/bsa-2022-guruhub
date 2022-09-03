type ChatMessageCreateRequestDto = {
  receiverId: number;
  senderId: number;
  message: string;
  chatId: string | null;
};

export { type ChatMessageCreateRequestDto };
