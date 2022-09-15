import { InterviewNoteGetAllItemResponseDto } from 'guruhub-shared';

import { SortOrder } from '~/common/enums/enums';
import { InterviewNoteCreateRequestArgumentsDto } from '~/common/types/types';
import { InterviewNote as InterviewNoteM } from '~/data/models/models';

type Constructor = {
  InterviewNoteModel: typeof InterviewNoteM;
};

class InterviewNote {
  #InterviewNoteModel: typeof InterviewNoteM;

  public constructor({ InterviewNoteModel }: Constructor) {
    this.#InterviewNoteModel = InterviewNoteModel;
  }

  public getAll(
    interviewId: number,
  ): Promise<InterviewNoteGetAllItemResponseDto[]> {
    return this.#InterviewNoteModel
      .query()
      .select()
      .where({ interviewId })
      .withGraphJoined(
        'author(withoutPassword).[userDetails(withoutMoneyBalance).[avatar]]',
      )
      .orderBy('createdAt', SortOrder.DESC)
      .castTo<InterviewNoteGetAllItemResponseDto[]>()
      .execute();
  }

  public create(
    interviewNote: InterviewNoteCreateRequestArgumentsDto,
  ): Promise<InterviewNoteGetAllItemResponseDto> {
    const { note, interviewId, authorId } = interviewNote;

    return this.#InterviewNoteModel
      .query()
      .insert({ note, interviewId, authorId })
      .withGraphFetched(
        'author(withoutPassword).[userDetails(withoutMoneyBalance).[avatar]]',
      )
      .castTo<InterviewNoteGetAllItemResponseDto>()
      .execute();
  }
}

export { InterviewNote };
