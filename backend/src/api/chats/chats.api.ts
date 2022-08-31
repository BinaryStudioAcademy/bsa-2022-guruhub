import { FastifyPluginAsync } from 'fastify';

import { ChatsApiPath, HttpCode, HttpMethod } from '~/common/enums/enums';
import { chatMessage as chatMessageService } from '~/services/services';

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
      const chatMessagesDto = await chatMessageService.getAllChatsLastMessages(
        id,
      );

      return rep.status(HttpCode.OK).send(chatMessagesDto);
    },
  });
};

export { initChatsApi };
