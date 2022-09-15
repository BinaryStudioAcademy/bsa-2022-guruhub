import {
  ApiPath,
  ChatsApiPath,
  ContentType,
  HttpMethod,
  SocketEvent,
} from 'common/enums/enums';
import {
  ChatMessageCreateRequestBodyDto,
  ChatMessageFilteringDto,
  ChatMessageGetAllItemResponseDto,
  ChatMessageGetAllLastWithEmptyChatsDto,
  ChatMessageGetAllResponseDto,
  SocketClient,
} from 'common/types/types';
import { Http } from 'services/http/http.service';
import { Socket } from 'services/socket/socket.service';

type NewMessagesListener = (
  chatMessage: ChatMessageGetAllItemResponseDto,
) => void;

type Constructor = {
  http: Http;
  apiPrefix: string;
  socketService: Socket;
};

class ChatsApi {
  #http: Http;

  #apiPrefix: string;

  #socket: SocketClient;

  public constructor({ http, apiPrefix, socketService }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
    this.#socket = socketService.socket;
  }

  public getAllChatsLastMessages(opts: {
    filtering: ChatMessageFilteringDto;
  }): Promise<ChatMessageGetAllLastWithEmptyChatsDto> {
    return this.#http.load(`${this.#apiPrefix}${ApiPath.CHATS}`, {
      method: HttpMethod.GET,
      queryString: {
        fullName: opts.filtering.fullName,
      },
    });
  }

  public getAllChatMessages(
    chatId: string,
  ): Promise<ChatMessageGetAllResponseDto> {
    return this.#http.load<ChatMessageGetAllResponseDto>(
      `${this.#apiPrefix}${ApiPath.CHATS}/${chatId}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public createChatMessage(
    chatMessageDto: ChatMessageCreateRequestBodyDto,
  ): Promise<ChatMessageGetAllItemResponseDto> {
    return this.#http.load<ChatMessageGetAllItemResponseDto>(
      `${this.#apiPrefix}${ApiPath.CHATS}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(chatMessageDto),
      },
    );
  }

  public hasUnreadMessages(): Promise<boolean> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.CHATS}${ChatsApiPath.HAS_UNREAD_MESSAGES}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public listenToNewMessages(cb: NewMessagesListener): void {
    this.#socket.on(SocketEvent.MESSAGE, cb);
  }

  public removeMessageListener(): void {
    this.#socket.off(SocketEvent.MESSAGE);
  }
}

export { ChatsApi };
