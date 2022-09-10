import { TaskWithModuleResponseDto } from 'common/types/types';

type Arguments = {
  moduleId: number;
  tasks: TaskWithModuleResponseDto[];
};

const getTaskForModule = ({
  moduleId,
  tasks,
}: Arguments): TaskWithModuleResponseDto | null => {
  const task = tasks.find((item) => item.moduleId === moduleId);

  return task ?? null;
};

export { getTaskForModule };
