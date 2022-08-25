import { MenteesToMentors as MenteesToMentorsM } from '~/data/models/models';

type Constructor = {
  MenteesToMentorsModel: typeof MenteesToMentorsM;
};

class MenteesToMentors {
  #MenteesToMentorsModel: typeof MenteesToMentorsM;

  public constructor({ MenteesToMentorsModel }: Constructor) {
    this.#MenteesToMentorsModel = MenteesToMentorsModel;
  }

  public async create(menteesToMentors: {
    courseId: number;
    mentorId: number;
    menteeId: number;
  }): Promise<MenteesToMentorsM> {
    const { courseId, mentorId, menteeId } = menteesToMentors;

    return this.#MenteesToMentorsModel.query().insert({
      courseId,
      mentorId,
      menteeId,
    });
  }

  public async getByCourseIdAndMenteeId(getMenteesToMentors: {
    courseId: number;
    menteeId: number;
  }): Promise<MenteesToMentorsM | null> {
    const { courseId, menteeId } = getMenteesToMentors;
    const menteeToMentor = await this.#MenteesToMentorsModel
      .query()
      .where({ courseId })
      .andWhere({ menteeId })
      .first();

    return menteeToMentor ?? null;
  }
}

export { MenteesToMentors };
