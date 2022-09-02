import fastifyMultipart from '@fastify/multipart';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import { ControllerHook, HttpCode } from '~/common/enums/enums';
import { InvalidFilesError } from '~/exceptions/exceptions';

type Options = {
  limits: {
    fieldSize: number;
  };
  allowedExtensions: string[];
};

const upload: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { limits, allowedExtensions } = opts;
  fastify.register(fastifyMultipart, { limits });
  fastify.decorateRequest('fileBuffer', null);

  fastify.addHook(ControllerHook.ON_REQUEST, async (request, reply) => {
    try {
      const data = await request.file();
      const isAllowedExtension = allowedExtensions.some(
        (extension) => extension === data.mimetype,
      );

      if (!isAllowedExtension) {
        throw new InvalidFilesError();
      }

      const fileBuffer = await data.toBuffer();

      request.fileBuffer = fileBuffer;
    } catch (err) {
      reply.status(HttpCode.BAD_REQUEST).send(err);
    }
  });
};

const file = fp(upload);

export { file };
