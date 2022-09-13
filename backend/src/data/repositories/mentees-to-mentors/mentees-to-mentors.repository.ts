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

  private static RECORD_EXISTS_CHECK = 1;

  public constructor({ MenteesToMentorsModel }: Constructor) {
    this.#MenteesToMentorsModel = MenteesToMentorsModel;
  }

  public getById(id: number): Promise<MenteesToMentorsResponseDto> {
    return this.#MenteesToMentorsModel
      .query()
      .findById(id)
      .withGraphFetched(
        'mentor(withoutPassword).[userDetails(withoutMoneyBalance)]',
      )
      .castTo<MenteesToMentorsResponseDto>()
      .execute();
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
        status: MenteesToMentorsStatus.IN_PROGRESS,
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

  public async getUncompletedByCourseIdAndMenteeId(getMenteesToMentors: {
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
      .select(MenteesToMentors.RECORD_EXISTS_CHECK)
      .where({ courseId })
      .andWhere({ menteeId })
      .first();

    return Boolean(menteeToMentor);
  }

  public async checkIsMenteeForAnyCourse(menteeId: number): Promise<boolean> {
    const menteeToMentor = await this.#MenteesToMentorsModel
      .query()
      .select(MenteesToMentors.RECORD_EXISTS_CHECK)
      .where({ menteeId })
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

  public async checkIsMentorForMentee({
    courseId,
    menteeId,
    mentorId,
  }: MenteesToMentorsRequestDto): Promise<boolean> {
    const menteeToMentor = await this.#MenteesToMentorsModel
      .query()
      .select(MenteesToMentors.RECORD_EXISTS_CHECK)
      .where({ courseId })
      .andWhere({ menteeId })
      .andWhere({ mentorId })
      .first();

    return Boolean(menteeToMentor);
  }
}

export { MenteesToMentors };
