import {
  ApiPath,
  ChatsApiPath,
  ContentType,
  HttpMethod,
} from '~/common/enums/enums';
import {
  ChatMessageCreateRequestBodyDto,
  ChatMessageFilteringDto,
  ChatMessageGetAllItemResponseDto,
  ChatMessageGetAllLastResponseDto,
  ChatMessageGetAllResponseDto,
} from '~/common/types/types';
import { Http } from '~/services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class ChatApi {
  #http: Http;

  #apiPrefix: string;

  public constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getAllChatsLastMessages(options: {
    filtering: ChatMessageFilteringDto;
  }): Promise<ChatMessageGetAllLastResponseDto> {
    return this.#http.load(`${this.#apiPrefix}${ApiPath.CHATS}`, {
      method: HttpMethod.GET,
      queryParams: {
        fullName: options.filtering.fullName,
      },
    });
  }

  public getAllChatMessages(
    chatId: string,
  ): Promise<ChatMessageGetAllResponseDto> {
    return this.#http.load<ChatMessageGetAllResponseDto>(
      `${this.#apiPrefix}${ApiPath.CHATS}/${chatId}`,
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
    );
  }
}

export { ChatApi };
