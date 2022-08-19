import { InterviewResponseDto } from 'guruhub-shared';

import { DbTableName } from '~/common/enums/enums';
import { Interview as InterviewM } from '~/data/models/models';

type Constructor = {
  InterviewModel: typeof InterviewM;
};

class Interview {
  #InterviewModel: typeof InterviewM;

  public constructor({ InterviewModel }: Constructor) {
    this.#InterviewModel = InterviewModel;
  }

  public async getAll(): Promise<InterviewResponseDto[]> {
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
      .castTo<InterviewResponseDto>()
      .where({ [DbTableName.INTERVIEWS + '.id']: id })
      .first();

    return interview ?? null;
  }
}

export { Interview };
