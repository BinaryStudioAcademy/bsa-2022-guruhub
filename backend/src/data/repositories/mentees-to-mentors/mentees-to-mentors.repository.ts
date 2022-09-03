import {
  MenteesToMentorsRequestDto,
  MenteesToMentorsResponseDto,
} from '~/common/types/types';
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
  ): Promise<MenteesToMentorsResponseDto> {
    const { courseId, mentorId, menteeId } = menteesToMentors;

    return this.#MenteesToMentorsModel
      .query()
      .insert({
        courseId,
        mentorId,
        menteeId,
      })
      .withGraphFetched('mentor(withoutPassword).[userDetails]')
      .castTo<MenteesToMentorsResponseDto>()
      .execute();
  }
  
  public async getByCourseIdAndMenteeId(getMenteesToMentors: {
    courseId: number;
    menteeId: number;
  }): Promise<MenteesToMentorsResponseDto | null> {
    const { courseId, menteeId } = getMenteesToMentors;
    const menteeToMentor = await this.#MenteesToMentorsModel
      .query()
      .where({ courseId })
      .andWhere({ menteeId })
      .withGraphJoined('mentor(withoutPassword).[userDetails]')
      .castTo<MenteesToMentorsResponseDto>()
      .first();

    return menteeToMentor ?? null;
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
}

export { MenteesToMentors };
