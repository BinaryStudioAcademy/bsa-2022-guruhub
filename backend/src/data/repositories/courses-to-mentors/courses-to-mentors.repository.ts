import { CoursesToMentorsRequestDto } from '~/common/types/types';
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

  public async getByUserIdAndCourseId({
    courseId,
    userId,
  }: CoursesToMentorsRequestDto): Promise<boolean> {
    const courseToMentor = await this.#CoursesToMentorsModel
      .query()
      .select(1)
      .where({ courseId })
      .andWhere({ userId })
      .first();

    return !!courseToMentor;
  }
}

export { CoursesToMentors };
