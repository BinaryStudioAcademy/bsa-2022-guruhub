import { InterviewResponseDto } from '~/common/types/types';
import { Interview as InterviewM } from '~/data/models/models';

type Constructor = {
  InterviewModel: typeof InterviewM;
};

class Interview {
  #InterviewModel: typeof InterviewM;

  public constructor({ InterviewModel }: Constructor) {
    this.#InterviewModel = InterviewModel;
  }

  public getAll(): Promise<InterviewResponseDto[]> {
    return this.#InterviewModel
      .query()
      .withGraphJoined('courseCategory')
      .withGraphJoined('interviewee')
      .withGraphJoined('interviewer')
      .castTo<InterviewResponseDto[]>()
      .execute();
  }

  public async getById(id: number): Promise<InterviewResponseDto | null> {
    const interview = await this.#InterviewModel
      .query()
      .select()
      .withGraphJoined('courseCategory')
      .withGraphJoined('interviewee')
      .withGraphJoined('interviewer')
      .findById(id)
      .castTo<InterviewResponseDto>();

    return interview ?? null;
  }
}

export { Interview };
