import { InterviewStatus } from '~/common/enums/enums';
import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
  InterviewsByIdResponseDto,
  InterviewsCreateRequestDto,
  InterviewsGetAllItemResponseDto,
  InterviewsGetByUserIdRequestDto,
  InterviewsGetInterviewerResponseDto,
  InterviewsGetOtherItemResponseDto,
  InterviewsGetOtherRequestArgumentsDto,
} from '~/common/types/types';
import { Interview as InterviewM } from '~/data/models/models';

type Constructor = {
  InterviewModel: typeof InterviewM;
};

class Interview {
  #InterviewModel: typeof InterviewM;

  public constructor({ InterviewModel }: Constructor) {
    this.#InterviewModel = InterviewModel;
  }

  public async getAll({
    count,
    page,
  }: EntityPaginationRequestQueryDto): Promise<
    EntityPagination<InterviewsGetAllItemResponseDto>
  > {
    const elementsToSkip = page * count;
    const items = await this.#InterviewModel
      .query()
      .withGraphJoined(
        '[courseCategory, interviewee(withoutPassword).[userDetails], interviewer(withoutPassword).[userDetails]]',
      )
      .offset(elementsToSkip)
      .limit(count)
      .castTo<InterviewsGetAllItemResponseDto[]>();

    const total = await this.#InterviewModel.query();

    return {
      items,
      total: total.length,
    };
  }

  public getInterviewersByCategoryId(
    categoryId: number,
  ): Promise<InterviewsGetInterviewerResponseDto[]> {
    return this.#InterviewModel
      .query()
      .select('interviewer')
      .where({ categoryId })
      .where('status', InterviewStatus.COMPLETED)
      .withGraphJoined(
        'interviewee(withoutPassword) as interviewer.userDetails',
      )
      .castTo<InterviewsGetInterviewerResponseDto[]>()
      .execute();
  }

  public getById(id: number): Promise<InterviewsByIdResponseDto | null> {
    return this.#InterviewModel
      .query()
      .select()
      .withGraphJoined(
        '[courseCategory, interviewee(withoutPassword).[userDetails], interviewer(withoutPassword).[userDetails]]',
      )
      .findById(id)
      .castTo<InterviewsByIdResponseDto>()
      .execute();
  }

  public create({
    status,
    categoryId,
    intervieweeUserId,
  }: InterviewsCreateRequestDto): Promise<InterviewM> {
    return this.#InterviewModel
      .query()
      .insert({
        status,
        categoryId,
        intervieweeUserId,
      })
      .execute();
  }

  public getPassedInterviewsByUserId(
    intervieweeUserId: number,
  ): Promise<InterviewM[]> {
    return this.#InterviewModel
      .query()
      .where({ intervieweeUserId })
      .andWhere('status', InterviewStatus.COMPLETED)
      .execute();
  }

  public async getInterviewByIntervieweeUserIdAndCategoryId(
    intervieweeUserId: number,
    categoryId: number,
  ): Promise<InterviewM | null> {
    const interview = await this.#InterviewModel
      .query()
      .where({ intervieweeUserId })
      .andWhere({ categoryId })
      .first();

    return interview ?? null;
  }

  public async getByUserId({
    count,
    page,
    userId,
  }: InterviewsGetByUserIdRequestDto): Promise<
    EntityPagination<InterviewsGetAllItemResponseDto>
  > {
    const elementsToSkip = page * count;

    const items = await this.#InterviewModel
      .query()
      .select()
      .where('intervieweeUserId', userId)
      .orWhere('interviewerUserId', userId)
      .withGraphJoined(
        '[courseCategory, interviewee(withoutPassword).[userDetails], interviewer(withoutPassword).[userDetails]]',
      )
      .offset(elementsToSkip)
      .limit(count)
      .castTo<InterviewsGetAllItemResponseDto[]>();

    const total = await this.#InterviewModel
      .query()
      .select()
      .where('intervieweeUserId', userId)
      .orWhere('interviewerUserId', userId);

    return { items, total: total.length };
  }

  public update(interview: {
    id: number;
    interviewerUserId: number;
    status: InterviewStatus;
    interviewDate: string | null;
  }): Promise<InterviewsByIdResponseDto> {
    const { id, interviewerUserId, status, interviewDate } = interview;

    return this.#InterviewModel
      .query()
      .select()
      .patchAndFetchById(id, { interviewerUserId, status, interviewDate })
      .withGraphFetched(
        '[courseCategory, interviewee(withoutPassword).[userDetails], interviewer(withoutPassword).[userDetails]]',
      )
      .castTo<InterviewsByIdResponseDto>()
      .execute();
  }

  public async getOtherByInterviewId({
    interviewId,
    intervieweeUserId,
    count,
    page,
  }: InterviewsGetOtherRequestArgumentsDto): Promise<
    EntityPagination<InterviewsGetOtherItemResponseDto>
  > {
    const ELEMENTS_TO_SKIP = page * count;

    const results = await this.#InterviewModel
      .query()
      .where({ intervieweeUserId })
      .andWhereNot('interviews.id', interviewId)
      .withGraphJoined('courseCategory')
      .withGraphJoined('interviewee(withoutPassword).[userDetails]')
      .withGraphJoined('interviewer(withoutPassword).[userDetails]')
      .limit(count)
      .offset(ELEMENTS_TO_SKIP)
      .castTo<InterviewsGetOtherItemResponseDto[]>();

    const total = await this.#InterviewModel
      .query()
      .where({ intervieweeUserId })
      .andWhereNot('interviews.id', interviewId);

    return {
      items: results,
      total: total.length,
    };
  }
}

export { Interview };
