import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { ChatsApiPath, HttpCode, HttpMethod } from '~/common/enums/enums';
import {
  ChatMessageCreateRequestBodyDto,
  ChatMessageFilteringDto,
  ChatMessageGetAllRequestParamsDto,
} from '~/common/types/types';
import { chatMessage as chatMessageService } from '~/services/services';
import {
  chatMessageCreateArguments as chatMessageCreateArgumentsValidationSchema,
  chatMessageFiltering as сhatMessageFilteringValidationSchema,
  chatMessageGetAllParams as chatMessageGetAllParamsValidationSchema,
} from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    chatMessage: typeof chatMessageService;
  };
};

const initChatsApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { chatMessage: chatMessageService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: ChatsApiPath.ROOT,
    schema: {
      querystring: сhatMessageFilteringValidationSchema,
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
      const { id: chatOpponentId } = req.params;
      const chatMessagesDto = await chatMessageService.getAll({
        userId,
        chatOpponentId,
      });

      return rep.status(HttpCode.OK).send(chatMessagesDto);
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
      const { message, chatOpponentId } = req.body;
      const newChatMessage = await chatMessageService.create({
        senderId: userId,
        receiverId: chatOpponentId,
        message,
      });

      return rep.status(HttpCode.CREATED).send(newChatMessage);
    },
  });
};

export { initChatsApi };
