import { CoursesToMentorsRequestDto } from '~/common/types/types';
import { CoursesToMentors as CoursesToMentorsM } from '~/data/models/models';

type Constructor = {
  CoursesToMentorsModel: typeof CoursesToMentorsM;
};

class CoursesToMentors {
  #CoursesToMentorsModel: typeof CoursesToMentorsM;

  private static RECORD_EXISTS_CHECK = 1;

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

  public async checkIsMentor({
    courseId,
    userId,
  }: CoursesToMentorsRequestDto): Promise<boolean> {
    const courseToMentor = await this.#CoursesToMentorsModel
      .query()
      .select(CoursesToMentors.RECORD_EXISTS_CHECK)
      .where({ courseId })
      .andWhere({ userId })
      .first();

    return Boolean(courseToMentor);
  }

  public async checkIsMentorForAnyCourse(userId: number): Promise<boolean> {
    const courseToMentor = await this.#CoursesToMentorsModel
      .query()
      .select(CoursesToMentors.RECORD_EXISTS_CHECK)
      .where({ userId })
      .first();

    return Boolean(courseToMentor);
  }
}

export { CoursesToMentors };
