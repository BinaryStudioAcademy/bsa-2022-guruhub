import {
  CoursesToMentorsRequestDto,
  CourseUpdateMentoringDto,
} from '~/common/types/types';
import { CoursesToMentors as CoursesToMentorsM } from '~/data/models/models';

type Constructor = {
  CoursesToMentorsModel: typeof CoursesToMentorsM;
};

class CoursesToMentors {
  #CoursesToMentorsModel: typeof CoursesToMentorsM;

  public constructor({ CoursesToMentorsModel }: Constructor) {
    this.#CoursesToMentorsModel = CoursesToMentorsModel;
  }

  public createMentorToCourse({
    courseId,
    userId,
  }: CoursesToMentorsRequestDto): Promise<CoursesToMentorsM> {
    return this.#CoursesToMentorsModel
      .query()
      .insert({ courseId, userId })
      .execute();
  }

  public updateMaxStudentsCount(
    userId: number,
    { courseId, maxStudentsCount }: CourseUpdateMentoringDto,
  ): Promise<number> {
    return this.#CoursesToMentorsModel
      .query()
      .findOne({
        courseId,
        userId,
      })
      .patch({
        maxStudentsCount,
      })
      .execute();
  }

  public async checkIsMentor({
    courseId,
    userId,
  }: CoursesToMentorsRequestDto): Promise<boolean> {
    const courseToMentor = await this.#CoursesToMentorsModel
      .query()
      // .select(1)
      .where({ courseId })
      .andWhere({ userId })
      .first();

    // eslint-disable-next-line no-console
    console.log(courseToMentor);

    return Boolean(courseToMentor);
  }
}

export { CoursesToMentors };
