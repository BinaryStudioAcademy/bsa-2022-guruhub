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
      .withGraphJoined('courseCategory')
      .withGraphJoined('interviewee')
      .withGraphJoined('interviewer')
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
}

export { Interview };
