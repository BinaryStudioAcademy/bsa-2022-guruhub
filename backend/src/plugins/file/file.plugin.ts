import { MultipartFile } from '@fastify/multipart';
import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

import {
  ControllerHook,
  ExceptionMessage,
  HttpCode,
} from '~/common/enums/enums';
import { FilesError, InvalidFilesError } from '~/exceptions/exceptions';

type Options = {
  allowedExtensions: string[];
};

const upload: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { allowedExtensions } = opts;

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

        if (file.file.truncated) {
          throw new FilesError({
            message: ExceptionMessage.FILE_TOO_BIG,
          });
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
