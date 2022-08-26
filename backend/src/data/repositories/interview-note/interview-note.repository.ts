import { InterviewNoteGetAllItemResponseDto } from 'guruhub-shared';

import { InterviewNoteCreateRequestArgumentsDto } from '~/common/types/types';
import { InterviewNote as InterviewNoteM } from '~/data/models/models';

type Constructor = {
  InteviewNoteModel: typeof InterviewNoteM;
};

class InterviewNote {
  #InterviewNoteModel: typeof InterviewNoteM;

  public constructor({ InteviewNoteModel }: Constructor) {
    this.#InterviewNoteModel = InteviewNoteModel;
  }

  public getAll(
    interviewId: number,
  ): Promise<InterviewNoteGetAllItemResponseDto[]> {
    return this.#InterviewNoteModel
      .query()
      .select()
      .where({ interviewId })
      .withGraphJoined('user')
      .castTo<InterviewNoteGetAllItemResponseDto[]>()
      .execute();
  }

  public create(
    interviewNote: InterviewNoteCreateRequestArgumentsDto,
  ): Promise<InterviewNoteM> {
    const { note, interviewId, authorId } = interviewNote;

    return this.#InterviewNoteModel
      .query()
      .insert({ note, interviewId, createdByUserId: authorId })
      .execute();
  }
}

export { InterviewNote };
