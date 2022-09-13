import { TaskStatus } from '~/common/enums/enums';

import { CourseModuleGetByIdResponseDto } from '../types';

type TaskWithModuleResponseDto = {
  id: number;
  menteesToMentorsId: number;
  moduleId: number;
  status: TaskStatus;
  module: CourseModuleGetByIdResponseDto;
};

export { type TaskWithModuleResponseDto };
