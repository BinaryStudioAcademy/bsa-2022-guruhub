import { MenteesToMentorsRequestDto } from '~/common/types/types';
import { MenteesToMentors as MenteesToMentorsM } from '~/data/models/models';

type Constructor = {
  MenteesToMentorsModel: typeof MenteesToMentorsM;
};

class MenteesToMentors {
  #MenteesToMentorsModel: typeof MenteesToMentorsM;

  public constructor({ MenteesToMentorsModel }: Constructor) {
    this.#MenteesToMentorsModel = MenteesToMentorsModel;
  }

  public create(
    menteesToMentors: MenteesToMentorsRequestDto,
  ): Promise<MenteesToMentorsM> {
    const { courseId, mentorId, menteeId } = menteesToMentors;

    return this.#MenteesToMentorsModel
      .query()
      .insert({
        courseId,
        mentorId,
        menteeId,
      })
      .execute();
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

  public getMentees(userId: number): Promise<Array<number>> {
    return this.#MenteesToMentorsModel
      .query()
      .select('mentees_to_mentors.mentee_id')
      .where({ mentorId: userId })
      .castTo<Array<number>>()
      .execute();
  }

  public getMentors(userId: number): Promise<Array<number>> {
    return this.#MenteesToMentorsModel
      .query()
      .select('mentees_to_mentors.mentor_id')
      .where({ menteeId: userId })
      .castTo<Array<number>>()
      .execute();
  }
}

export { MenteesToMentors };
