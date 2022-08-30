import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { HttpCode } from 'guruhub-shared';

import { HttpMethod, TasksApiPath, TaskStatus } from '~/common/enums/enums';
import {
  TaskByIdRequestParamsDto,
  TaskNoteCreateRequestBodyDto,
} from '~/common/types/types';
import { task as taskService } from '~/services/services';
import {
  tasksByIdParams as tasksByIdParamsValidationSchema,
  tasksCreateRequestBody as tasksCreateRequestBodyValidationSchema,
} from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    task: typeof taskService;
  };
};

const initTasksApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { task: taskService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: TasksApiPath.TASKS_$ID_UPLOAD,
    schema: {
      params: tasksByIdParamsValidationSchema,
      body: tasksCreateRequestBodyValidationSchema,
    },
    async handler(
      req: FastifyRequest<{
        Body: TaskNoteCreateRequestBodyDto;
        Params: TaskByIdRequestParamsDto;
      }>,
      rep,
    ) {
      const { note } = req.body;
      const { taskId } = req.params;
      const { id: authorId } = req.user;

      const newNote = await taskService.manipulate({
        note,
        authorId,
        taskId,
        status: TaskStatus.PENDING,
      });

      rep.status(HttpCode.CREATED).send(newNote);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: TasksApiPath.TASKS_$ID_APPROVE,
    schema: {
      params: tasksByIdParamsValidationSchema,
      body: tasksCreateRequestBodyValidationSchema,
    },
    async handler(
      req: FastifyRequest<{
        Body: TaskNoteCreateRequestBodyDto;
        Params: TaskByIdRequestParamsDto;
      }>,
      rep,
    ) {
      const { note } = req.body;
      const { taskId } = req.params;
      const { id: authorId } = req.user;

      const newNote = await taskService.manipulate({
        note,
        authorId,
        taskId,
        status: TaskStatus.COMPLETED,
      });

      rep.status(HttpCode.CREATED).send(newNote);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: TasksApiPath.TASKS_$ID_REJECT,
    schema: {
      params: tasksByIdParamsValidationSchema,
      body: tasksCreateRequestBodyValidationSchema,
    },
    async handler(
      req: FastifyRequest<{
        Body: TaskNoteCreateRequestBodyDto;
        Params: TaskByIdRequestParamsDto;
      }>,
      rep,
    ) {
      const { note } = req.body;
      const { taskId } = req.params;
      const { id: authorId } = req.user;

      const newNote = await taskService.manipulate({
        note,
        authorId,
        taskId,
        status: TaskStatus.REJECTED,
      });

      rep.status(HttpCode.CREATED).send(newNote);
    },
  });
};

export { initTasksApi };
