import { ApiPath, ContentType, HttpMethod } from 'common/enums/enums';
import {
  ChatMessageCreateRequestBodyDto,
  ChatMessageFilteringDto,
  ChatMessageGetAllItemResponseDto,
  ChatMessageGetAllLastResponseDto,
  ChatMessageGetAllResponseDto,
} from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class ChatsApi {
  #http: Http;

  #apiPrefix: string;

  public constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getAllChatsLastMessages(opts: {
    filtering: ChatMessageFilteringDto;
  }): Promise<ChatMessageGetAllLastResponseDto> {
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
}

export { ChatsApi };
