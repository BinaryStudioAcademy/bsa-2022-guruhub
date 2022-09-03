import { TaskStatus } from '~/common/enums/enums';

type TaskGetItemReponseDto = {
  id: number;
  menteesToMentorsId: number;
  moduleId: number;
  status: TaskStatus;
};

export { type TaskGetItemReponseDto };
