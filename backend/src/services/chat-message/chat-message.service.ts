import { ChatMessageStatus, SocketEvent } from '~/common/enums/enums';
import {
  ChatGetAllMessagesRequestDto,
  ChatMessageCreateRequestDto,
  ChatMessageFilteringDto,
  ChatMessageGetAllItemResponseDto,
  ChatMessageGetAllLastResponseDto,
  ChatMessageGetEmptyChatDto,
  ChatMessageGetEmptyChatsRequestDto,
} from '~/common/types/types';
import { ChatMessage as ChatMessageM } from '~/data/models/models';
import {
  chatMessage as chatMessageRep,
  menteesToMentors as menteesToMentorsRep,
  user as userRep,
} from '~/data/repositories/repositories';
import { createUuid, sanitizeHTML } from '~/helpers/helpers';
import { socket as socketServ } from '~/services/services';

type Constructor = {
  chatMessageRepository: typeof chatMessageRep;
  menteesToMentorsRepository: typeof menteesToMentorsRep;
  userRepository: typeof userRep;
  socketService: typeof socketServ;
};

class ChatMessage {
  #chatMessageRepository: typeof chatMessageRep;

  #menteesToMentorsRepository: typeof menteesToMentorsRep;

  #userRepository: typeof userRep;

  #socketService: typeof socketServ;

  private static MAX_PEOPLE_IN_CHAT = 2;

  public constructor({
    chatMessageRepository,
    menteesToMentorsRepository,
    userRepository,
    socketService,
  }: Constructor) {
    this.#chatMessageRepository = chatMessageRepository;
    this.#menteesToMentorsRepository = menteesToMentorsRepository;
    this.#userRepository = userRepository;
    this.#socketService = socketService;
  }

  public async getAll({
    chatId,
  }: ChatGetAllMessagesRequestDto): Promise<ChatMessageGetAllLastResponseDto> {
    const chatMessages = await this.#chatMessageRepository.getAll({
      chatId,
    });

    return { items: chatMessages };
  }

  public async getAllEmptyChats({
    userId,
    fullName,
    lastMessagesInChats,
  }: ChatMessageGetEmptyChatsRequestDto): Promise<
    ChatMessageGetEmptyChatDto[]
  > {
    const userMenteesOrMentorsIds = await this.getMentorsAndMenteesIds(
      userId,
      fullName,
    );

    const usersWithCreatedChats: number[] = lastMessagesInChats.reduce<
      number[]
    >((usersWithChats, chatMessage) => {
      return usersWithChats.concat([
        chatMessage.sender.id,
        chatMessage.receiver.id,
      ]);
    }, []);

    const usersWithoutChatsIds = userMenteesOrMentorsIds.filter(
      (id) => !usersWithCreatedChats.includes(id),
    );

    const receivers = await this.#userRepository.getByIds(usersWithoutChatsIds);

    return receivers.map((receiver) => ({
      chatId: createUuid(),
      receiver,
    }));
  }

  public async getMentorsAndMenteesIds(
    userId: number,
    fullName: string,
  ): Promise<number[]> {
    const userMenteesOrMentors =
      await this.#menteesToMentorsRepository.getMenteesOrMentorsByFullName(
        userId,
        fullName ?? '',
      );

    return userMenteesOrMentors.map((menteesOrMentors) => {
      return menteesOrMentors.menteeId === userId
        ? menteesOrMentors.mentorId
        : menteesOrMentors.menteeId;
    });
  }

  public async getAllLastMessages(
    userId: number,
    filteringOpts: ChatMessageFilteringDto,
  ): Promise<ChatMessageGetAllItemResponseDto[]> {
    const { fullName } = filteringOpts;

    const userMenteesOrMentorsIds = await this.getMentorsAndMenteesIds(
      userId,
      fullName,
    );

    const lastMessagesInChats =
      await this.#chatMessageRepository.getLastMessagesInChats(
        userId,
        userMenteesOrMentorsIds,
      );

    const lastMessagesInChatsIds = lastMessagesInChats.map(
      (chatMessage: ChatMessageM) => chatMessage.id,
    );

    const lastMessagesWithMentorsAndMentees =
      await this.#chatMessageRepository.getLastMessagesWithMentorsAndMentees(
        lastMessagesInChatsIds,
      );

    return lastMessagesWithMentorsAndMentees;
  }

  public async create(
    chatMessageCreateDto: ChatMessageCreateRequestDto,
  ): Promise<ChatMessageGetAllItemResponseDto> {
    const { receiverId, senderId, message, chatId } = chatMessageCreateDto;

    const newMessageChatId = chatId ?? createUuid();

    const numOfUsersInChat =
      this.#socketService.getNumberOfUsersInRoom(newMessageChatId);

    const areBothInChat = numOfUsersInChat === ChatMessage.MAX_PEOPLE_IN_CHAT;

    const newMessageStatus = areBothInChat
      ? ChatMessageStatus.READ
      : ChatMessageStatus.UNREAD;

    const newMessage = await this.#chatMessageRepository.create({
      receiverId,
      senderId,
      message: sanitizeHTML(message),
      chatId: newMessageChatId,
      status: newMessageStatus,
    });

    this.#socketService.emit({
      event: SocketEvent.MESSAGE,
      args: newMessage,
      roomId: newMessageChatId,
    });

    return newMessage;
  }

  public checkHasUnreadMessages(userId: number): Promise<boolean> {
    return this.#chatMessageRepository.checkHasUnreadMessages(userId);
  }
}

export { ChatMessage };
