import { MentorCreateRequestDto } from '~/common/types/types';
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
  }: MentorCreateRequestDto): Promise<CoursesToMentorsM> {
    return this.#CoursesToMentorsModel
      .query()
      .insert({ courseId, userId })
      .execute();
  }
}

export { CoursesToMentors };
