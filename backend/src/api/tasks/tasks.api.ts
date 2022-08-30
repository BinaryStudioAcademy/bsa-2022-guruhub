import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { HttpCode } from 'guruhub-shared';

import {
  HttpMethod,
  PaginationDefaultValue,
  TasksApiPath,
} from '~/common/enums/enums';
import {
  EntityPaginationRequestQueryDto,
  TaskNoteByIdRequestParamsDto,
  TaskNoteCreateRequestBodyDto,
} from '~/common/types/types';
import { taskNote as taskNoteService } from '~/services/services';
import {
  pagination as paginationValidationSchema,
  taskNotesByIdParams as taskNotesByIdParamsValidationSchema,
  taskNotesCreateRequestBody as taskNotesCreateRequestBodyValidationSchema,
} from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    taskNote: typeof taskNoteService;
  };
};

const initTasksApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { taskNote: taskNoteService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: TasksApiPath.TASKS_$ID_NOTES,
    schema: {
      querystring: paginationValidationSchema,
      params: taskNotesByIdParamsValidationSchema,
    },
    async handler(
      req: FastifyRequest<{
        Params: TaskNoteByIdRequestParamsDto;
        Querystring: EntityPaginationRequestQueryDto;
      }>,
      rep,
    ) {
      const { taskId } = req.params;
      const {
        count = PaginationDefaultValue.DEFAULT_COUNT,
        page = PaginationDefaultValue.DEFAULT_PAGE,
      } = req.query;

      const taskNotes = await taskNoteService.getAll({ taskId, count, page });

      rep.status(HttpCode.OK).send(taskNotes);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: TasksApiPath.TASKS_$ID_NOTES,
    schema: {
      params: taskNotesByIdParamsValidationSchema,
      body: taskNotesCreateRequestBodyValidationSchema,
    },
    async handler(
      req: FastifyRequest<{
        Params: TaskNoteByIdRequestParamsDto;
        Body: TaskNoteCreateRequestBodyDto;
      }>,
      rep,
    ) {
      const { taskId } = req.params;
      const { note } = req.body;
      const { id: authorId } = req.user;

      const newNote = await taskNoteService.create({ authorId, note, taskId });

      rep.status(HttpCode.CREATED).send(newNote);
    },
  });
};

export { initTasksApi };
