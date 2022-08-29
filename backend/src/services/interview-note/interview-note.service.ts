import { InterviewNoteGetAllItemResponseDto } from 'guruhub-shared';

import {
  InterviewNoteCreateRequestArgumentsDto,
  InterviewNoteGetAllResponseDto,
} from '~/common/types/types';
import { interviewNote as interviewNoteRep } from '~/data/repositories/repositories';
import { sanitizeHTML } from '~/helpers/helpers';

type Constructor = {
  interviewNoteRepository: typeof interviewNoteRep;
};

class InterviewNote {
  #interviewNoteRepository: typeof interviewNoteRep;

  public constructor({ interviewNoteRepository }: Constructor) {
    this.#interviewNoteRepository = interviewNoteRepository;
  }

  public async getAll(
    interviewId: number,
  ): Promise<InterviewNoteGetAllResponseDto> {
    const items = await this.#interviewNoteRepository.getAll(interviewId);

    return { items };
  }

  public create(
    interviewNoteCreateDto: InterviewNoteCreateRequestArgumentsDto,
  ): Promise<InterviewNoteGetAllItemResponseDto> {
    const { note, interviewId, authorId } = interviewNoteCreateDto;

    return this.#interviewNoteRepository.create({
      note: sanitizeHTML(note),
      interviewId,
      authorId,
    });
  }
}

export { InterviewNote };
