import {
  InterviewsByIdResponseDto,
  InterviewsGetAllItemResponseDto,
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
      .withGraphJoined('interviewee')
      .withGraphJoined('interviewer')
      .castTo<InterviewsGetAllItemResponseDto[]>()
      .execute();
  }

  public async getById(id: number): Promise<InterviewsByIdResponseDto | null> {
    const interview = await this.#InterviewModel
      .query()
      .select()
      .withGraphFetched('courseCategory')
      .withGraphFetched('interviewee.[userDetails]')
      .withGraphFetched('interviewer.[userDetails]')
      .findById(id)
      .castTo<InterviewsByIdResponseDto>();

    return interview ?? null;
  }

  public async getByUserId(
    userId: number,
  ): Promise<InterviewsGetAllItemResponseDto[]> {
    return this.#InterviewModel
      .query()
      .select()
      .where('intervieweeUserId', userId)
      .orWhere('interviewerUserId', userId)
      .withGraphJoined('courseCategory')
      .withGraphJoined('interviewee')
      .withGraphJoined('interviewer')
      .castTo<InterviewsGetAllItemResponseDto[]>()
      .execute();
  }

  public update(interview: {
    id: number;
    interviewerUserId: number;
  }): Promise<InterviewsByIdResponseDto> {
    const { id, interviewerUserId } = interview;

    return this.#InterviewModel
      .query()
      .patchAndFetchById(id, { interviewerUserId })
      .withGraphFetched('courseCategory')
      .withGraphFetched('interviewee.[userDetails(onlyFullName)]')
      .withGraphFetched('interviewer.[userDetails(onlyFullName)]')
      .modifiers({
        onlyFullName(builder) {
          builder.select('fullName');
        },
      })
      .castTo<InterviewsByIdResponseDto>()
      .execute();
  }
}

export { Interview };
