import { TaskStatus } from '~/common/enums/enums';
import {
  TaskGetByMenteeIdAndModuleId,
  TaskGetByMenteeIdCourseIdModuleIdRequestDto,
  TasksGetByCourseIdAndMenteeIdRequestDto,
  TaskWithModuleResponseDto,
} from '~/common/types/types';
import { Task as TaskM } from '~/data/models/models';

type Constructor = {
  TaskModel: typeof TaskM;
};

class Task {
  #TaskModel: typeof TaskM;

  public constructor({ TaskModel }: Constructor) {
    this.#TaskModel = TaskModel;
  }

  public updateStatus(taskId: number, status: TaskStatus): Promise<TaskM> {
    return this.#TaskModel
      .query()
      .patchAndFetchById(taskId, { status })
      .execute();
  }

  public async getById(id: number): Promise<TaskM | null> {
    const task = await this.#TaskModel.query().findById(id);

    return task ?? null;
  }

  public async getByMenteeIdAndModuleId({
    moduleId,
    menteeId,
  }: TaskGetByMenteeIdAndModuleId): Promise<TaskM | null> {
    const task = await this.#TaskModel
      .query()
      .where('tasks.moduleId', moduleId)
      .andWhere('menteesToMentors.menteeId', menteeId)
      .withGraphJoined('menteesToMentors')
      .first();

    return task ?? null;
  }

  public async getByMenteeIdCourseIdModuleId({
    courseId,
    menteeId,
    moduleId,
  }: TaskGetByMenteeIdCourseIdModuleIdRequestDto): Promise<TaskM | null> {
    const task = await this.#TaskModel
      .query()
      .where('tasks.moduleId', moduleId)
      .andWhere('menteesToMentors.menteeId', menteeId)
      .andWhere('menteesToMentors.courseId', courseId)
      .withGraphJoined('menteesToMentors')
      .first();

    return task ?? null;
  }

  public getAllByCourseIdAndMenteeId({
    courseId,
    menteeId,
  }: TasksGetByCourseIdAndMenteeIdRequestDto): Promise<
    TaskWithModuleResponseDto[]
  > {
    return this.#TaskModel
      .query()
      .withGraphJoined('[menteesToMentors, module]')
      .where('menteesToMentors.courseId', courseId)
      .andWhere('menteesToMentors.menteeId', menteeId)
      .castTo<TaskWithModuleResponseDto[]>()
      .execute();
  }
}

export { Task };
