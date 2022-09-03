import { EntityPaginationRequestQueryDto } from '~/common/types/types';

type TaskNoteGetAllArgumentsDto = {
  taskId: number;
} & EntityPaginationRequestQueryDto;

export { type TaskNoteGetAllArgumentsDto };
