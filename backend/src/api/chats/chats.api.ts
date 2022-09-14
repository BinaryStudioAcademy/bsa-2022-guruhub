import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { ChatsApiPath, HttpCode, HttpMethod } from '~/common/enums/enums';
import {
  ChatMessageCreateRequestBodyDto,
  ChatMessageFilteringDto,
  ChatMessageGetAllRequestParamsDto,
} from '~/common/types/types';
import {
  chatMessage as chatMessageService,
  socket as socketService,
} from '~/services/services';
import {
  chatMessageCreateArguments as chatMessageCreateArgumentsValidationSchema,
  chatMessageFiltering as chatMessageFilteringValidationSchema,
  chatMessageGetAllParams as chatMessageGetAllParamsValidationSchema,
} from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    chatMessage: typeof chatMessageService;
    socket: typeof socketService;
  };
};

const initChatsApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { chatMessage: chatMessageService, socket: socketService } =
    opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: ChatsApiPath.ROOT,
    schema: {
      querystring: chatMessageFilteringValidationSchema,
    },
    async handler(
      req: FastifyRequest<{
        Querystring: ChatMessageFilteringDto;
      }>,
      rep,
    ) {
      const { id } = req.user;
      const { fullName } = req.query;

      const allChatsLastMessagesMessagesDto =
        await chatMessageService.getAllLastMessages(id, { fullName });

      return rep.status(HttpCode.OK).send(allChatsLastMessagesMessagesDto);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: ChatsApiPath.$ID,
    schema: {
      params: chatMessageGetAllParamsValidationSchema,
    },
    async handler(
      req: FastifyRequest<{ Params: ChatMessageGetAllRequestParamsDto }>,
      rep,
    ) {
      const { id: userId } = req.user;
      const { id } = req.params;
      const { items } = await chatMessageService.getAll({
        chatId: id,
      });

      let chatOpponent = null;
      const [currentChatMessage] = items;

      if (currentChatMessage) {
        chatOpponent =
          currentChatMessage.sender.id === userId
            ? currentChatMessage.receiver
            : currentChatMessage.sender;
      }

      return rep.status(HttpCode.OK).send({ items, chatId: id, chatOpponent });
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: ChatsApiPath.ROOT,
    schema: { body: chatMessageCreateArgumentsValidationSchema },
    async handler(
      req: FastifyRequest<{ Body: ChatMessageCreateRequestBodyDto }>,
      rep,
    ) {
      const { id: userId } = req.user;
      const { message, chatId, receiverId } = req.body;

      const newChatMessage = await socketService.sendMessage({
        message,
        chatId,
        receiverId,
        senderId: userId,
      });

      return rep.status(HttpCode.CREATED).send(newChatMessage);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: ChatsApiPath.HAS_UNREAD_MESSAGES,
    async handler(req, rep) {
      const { id } = req.user;

      const hasUnreadMessages = await chatMessageService.checkHasUnreadMessages(
        id,
      );

      return rep.status(HttpCode.OK).send(hasUnreadMessages);
    },
  });
};

export { initChatsApi };
