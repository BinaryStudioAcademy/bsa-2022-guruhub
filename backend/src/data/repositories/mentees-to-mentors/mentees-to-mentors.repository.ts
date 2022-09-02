import { IdContainer, MenteesToMentorsRequestDto } from '~/common/types/types';
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

  public async checkIsMentee(getMenteesToMentors: {
    courseId: number;
    menteeId: number;
  }): Promise<boolean> {
    const { courseId, menteeId } = getMenteesToMentors;
    const menteeToMentor = await this.#MenteesToMentorsModel
      .query()
      .select(1)
      .where({ courseId })
      .andWhere({ menteeId })
      .first();

    return Boolean(menteeToMentor);
  }

  public getMentors(userId: number): Promise<IdContainer[]> {
    return this.#MenteesToMentorsModel
      .query()
      .select('mentorId as id')
      .where({ menteeId: userId })
      .castTo<IdContainer[]>()
      .execute();
  }

  public getMentees(userId: number): Promise<IdContainer[]> {
    return this.#MenteesToMentorsModel
      .query()
      .select('menteeId as id')
      .where({ mentorId: userId })
      .castTo<IdContainer[]>()
      .execute();
  }
}

export { MenteesToMentors };
