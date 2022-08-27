import { InterviewStatus } from '~/common/enums/enums';
import {
  EntityPagination,
  InterviewsByIdResponseDto,
  InterviewsCreateRequestDto,
  InterviewsGetAllItemResponseDto,
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

  public getAll(): Promise<InterviewsGetAllItemResponseDto[]> {
    return this.#InterviewModel
      .query()
      .withGraphJoined('courseCategory')
      .withGraphJoined('interviewee(withoutPassword).[userDetails]')
      .withGraphJoined('interviewer(withoutPassword).[userDetails]')
      .modifiers({
        withoutPassword(builder) {
          builder.select('id', 'email', 'createdAt', 'updatedAt');
        },
      })
      .castTo<InterviewsGetAllItemResponseDto[]>()
      .execute();
  }

  public async getById(id: number): Promise<InterviewsByIdResponseDto | null> {
    const interview = await this.#InterviewModel
      .query()
      .select()
      .withGraphJoined('courseCategory')
      .withGraphJoined('interviewee(withoutPassword).[userDetails]')
      .withGraphJoined('interviewer(withoutPassword).[userDetails]')
      .modifiers({
        withoutPassword(builder) {
          builder.select('id', 'email', 'createdAt', 'updatedAt');
        },
      })
      .findById(id)
      .castTo<InterviewsByIdResponseDto>();

    return interview ?? null;
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

  public getByUserId(
    userId: number,
  ): Promise<InterviewsGetAllItemResponseDto[]> {
    return this.#InterviewModel
      .query()
      .select()
      .where('intervieweeUserId', userId)
      .orWhere('interviewerUserId', userId)
      .withGraphJoined('courseCategory')
      .withGraphJoined('interviewee(withoutPassword).[userDetails]')
      .withGraphJoined('interviewer(withoutPassword).[userDetails]')
      .modifiers({
        withoutPassword(builder) {
          builder.select('id', 'email', 'createdAt', 'updatedAt');
        },
      })
      .castTo<InterviewsGetAllItemResponseDto[]>()
      .execute();
  }

  public async getOtherByInterviewId({
    interviewId,
    intervieweeUserId,
    count,
    page,
  }: InterviewsGetOtherRequestArgumentsDto): Promise<
    EntityPagination<InterviewsGetAllItemResponseDto>
  > {
    const ELEMENTS_TO_SKIP = page * count;

    const results = await this.#InterviewModel
      .query()
      .where({ intervieweeUserId })
      .andWhereNot('interviews.id', interviewId)
      .withGraphJoined('courseCategory')
      .withGraphJoined('interviewee(withoutPassword).[userDetails]')
      .withGraphJoined('interviewer(withoutPassword).[userDetails]')
      .modifiers({
        withoutPassword(builder) {
          builder.select('id', 'email', 'createdAt', 'updatedAt');
        },
      })
      .limit(count)
      .offset(ELEMENTS_TO_SKIP)
      .castTo<InterviewsGetAllItemResponseDto[]>();

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
