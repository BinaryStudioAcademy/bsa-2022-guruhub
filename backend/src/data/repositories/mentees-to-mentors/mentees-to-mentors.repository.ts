import { MenteesToMentorsStatus } from '~/common/enums/enums';
import {
  MenteesToMentorsChangeStatusRequestDto,
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
      .withGraphFetched(
        'mentor(withoutPassword).[userDetails(withoutMoneyBalance)]',
      )
      .castTo<MenteesToMentorsResponseDto>()
      .execute();
  }

  public changeMentor(
    menteesToMentors: MenteesToMentorsRequestDto,
  ): Promise<MenteesToMentorsResponseDto> {
    const { courseId, mentorId, menteeId } = menteesToMentors;

    return this.#MenteesToMentorsModel
      .query()
      .patch({
        mentorId,
      })
      .where({
        menteeId,
        courseId,
      })
      .returning('*')
      .first()
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
      .andWhereNot({ status: MenteesToMentorsStatus.COMPLETED })
      .withGraphJoined(
        'mentor(withoutPassword).[userDetails(withoutMoneyBalance)]',
      )
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

  public getMenteesOrMentorsByFullName(
    userId: number,
    fullName: string,
  ): Promise<MenteesToMentorsM[]> {
    return this.#MenteesToMentorsModel
      .query()
      .select('menteeId', 'mentorId')
      .where((builder) =>
        builder
          .where('mentorId', userId)
          .where('mentee:userDetails.fullName', 'ilike', `%${fullName}%`),
      )
      .orWhere((builder) =>
        builder
          .where('menteeId', userId)
          .where('mentor:userDetails.fullName', 'ilike', `%${fullName}%`),
      )
      .withGraphJoined(
        '[mentee(withoutPassword).[userDetails(withoutMoneyBalance)], mentor(withoutPassword).[userDetails(withoutMoneyBalance)]]',
      )
      .execute();
  }

  public changeStatus({
    id,
    status,
  }: MenteesToMentorsChangeStatusRequestDto): Promise<number> {
    return this.#MenteesToMentorsModel
      .query()
      .findById(id)
      .patch({ status })
      .execute();
  }
}

export { MenteesToMentors };
