import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import { ControllerHook } from '~/common/enums/enums';
import { SocketServer } from '~/common/types/types';

type Options = {
  io: SocketServer;
};

const socketInjectorPlugin: FastifyPluginAsync<Options> = async (
  fastify,
  opts,
) => {
  fastify.decorateRequest('io', null);

  fastify.addHook(ControllerHook.PRE_HANDLER, (...args) => {
    const [req, , hookDone] = args;
    const { io } = opts;
    req.io = io;
    hookDone();
  });
};

const socketInjector = fp(socketInjectorPlugin);

export { socketInjector };
