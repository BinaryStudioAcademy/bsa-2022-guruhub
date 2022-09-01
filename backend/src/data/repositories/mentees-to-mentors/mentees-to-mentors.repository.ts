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

  public getMentees(userId: number): Promise<MenteesToMentorsM[]> {
    return this.#MenteesToMentorsModel
      .query()
      .select('mentees_to_mentors.mentee_id')
      .where({ mentorId: userId })
      .execute();
  }

  public getMentors(userId: number): Promise<MenteesToMentorsM[]> {
    return this.#MenteesToMentorsModel
      .query()
      .select('mentees_to_mentors.mentor_id')
      .where({ menteeId: userId })
      .execute();
  }

  public getMentorsByFullName(
    userId: number,
    fullName: string,
  ): Promise<MenteesToMentorsM[]> {
    return this.#MenteesToMentorsModel
      .query()
      .select('mentor.id')
      .where({ menteeId: userId })
      .andWhere('fullName', 'like', '%' + fullName + '%')
      .withGraphJoined('mentor(withoutPassword).[userDetails]')
      .execute();
  }

  public getMenteesByFullName(
    userId: number,
    fullName: string,
  ): Promise<MenteesToMentorsM[]> {
    return this.#MenteesToMentorsModel
      .query()
      .select('mentee.id')
      .where({ mentorId: userId })
      .andWhere('fullName', 'like', '%' + fullName + '%')
      .withGraphJoined('mentee(withoutPassword).[userDetails]')
      .execute();
  }
}

export { MenteesToMentors };
