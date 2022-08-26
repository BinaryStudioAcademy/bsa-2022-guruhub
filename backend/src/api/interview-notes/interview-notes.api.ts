import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import {
  HttpCode,
  HttpMethod,
  InterviewsApiPath,
  // PermissionKey,
} from '~/common/enums/enums';
import {
  InterviewNoteCreateRequestParamsDto,
  InterviewNoteCreateRequsetDto,
} from '~/common/types/types';
// import { checkHasPermissions } from '~/hooks/hooks';
import { interviewNote as interviewNoteService } from '~/services/services';

type Options = {
  services: {
    interviewNote: typeof interviewNoteService;
  };
};

const initInterviewNotesApi: FastifyPluginAsync<Options> = async (
  fastify,
  opts,
) => {
  const { interviewNote: interviewNoteService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: `${InterviewsApiPath.$ID}${InterviewsApiPath.NOTES}`,
    async handler(
      req: FastifyRequest<{ Params: InterviewNoteCreateRequestParamsDto }>,
      rep,
    ) {
      const { id: interviewId } = req.params;
      const notes = await interviewNoteService.getAll(interviewId);

      return rep.status(HttpCode.OK).send(notes);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: `${InterviewsApiPath.$ID}${InterviewsApiPath.NOTES}`,
    async handler(
      req: FastifyRequest<{
        Params: InterviewNoteCreateRequestParamsDto;
        Body: InterviewNoteCreateRequsetDto;
      }>,
      rep,
    ) {
      const { id: authorId } = req.user;
      const { id: interviewId } = req.params;
      const { note } = req.body;
      const newNote = await interviewNoteService.create({
        note,
        interviewId,
        authorId,
      });

      return rep.status(HttpCode.OK).send(newNote);
    },
  });
};

export { initInterviewNotesApi };
