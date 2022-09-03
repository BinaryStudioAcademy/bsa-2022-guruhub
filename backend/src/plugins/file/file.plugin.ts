import fastifyMultipart, { MultipartFile } from '@fastify/multipart';
import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

import { ControllerHook, HttpCode } from '~/common/enums/enums';
import { InvalidFilesError } from '~/exceptions/exceptions';

type Options = {
  limits: {
    fileSize: number;
  };
  allowedExtensions: string[];
};

const upload: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { limits, allowedExtensions } = opts;
  fastify.register(fastifyMultipart, { limits, attachFieldsToBody: true });
  fastify.decorateRequest('fileBuffer', null);

  fastify.addHook(
    ControllerHook.PRE_VALIDATION,
    async (
      request: FastifyRequest<{ Body: { file: MultipartFile } }>,
      reply,
    ) => {
      try {
        if (!request.isMultipart()) {
          return;
        }

        const { file } = request.body;
        const isAllowedExtension = allowedExtensions.some(
          (extension) => extension === file.mimetype,
        );

        if (!isAllowedExtension) {
          throw new InvalidFilesError();
        }

        const fileBuffer = await file.toBuffer();

        request.fileBuffer = fileBuffer;
      } catch (err) {
        reply.status(HttpCode.BAD_REQUEST).send(err);
      }
    },
  );
};

const file = fp(upload);

export { file };
