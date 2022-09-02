import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { ChatsApiPath, HttpCode, HttpMethod } from '~/common/enums/enums';
import {
  ChatMessageCreateRequestBodyDto,
  ChatMessageGetAllRequestParamsDto,
} from '~/common/types/types';
import { chatMessage as chatMessageService } from '~/services/services';
import {
  chatMessageCreateArguments as chatMessageCreateArgumentsValidationSchema,
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
    async handler(req, rep) {
      const { id } = req.user;
      const allChatsLastMessagesDto =
        await chatMessageService.getAllLastMessages(id);

      return rep.status(HttpCode.OK).send(allChatsLastMessagesDto);
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
      const { chatId } = req.params;
      const chatMessagesDto = await chatMessageService.getAll({
        chatId,
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
      const { message, chatId, receiverId } = req.body;
      const newChatMessage = await chatMessageService.create({
        senderId: userId,
        receiverId,
        message,
        chatId,
      });

      return rep.status(HttpCode.CREATED).send(newChatMessage);
    },
  });
};

export { initChatsApi };
