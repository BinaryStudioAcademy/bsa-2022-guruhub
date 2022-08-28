import { InterviewNoteGetAllItemResponseDto } from 'guruhub-shared';

import {
  InterviewNoteCreateRequestArgumentsDto,
  InterviewNoteGetAllResponseDto,
} from '~/common/types/types';
import {
  interviewNote as interviewNoteRep,
  user as userRep,
} from '~/data/repositories/repositories';
import { sanitizeHTML } from '~/helpers/helpers';

type Constructor = {
  interviewNoteRepository: typeof interviewNoteRep;
  userRepository: typeof userRep;
};

class InterviewNote {
  #interviewNoteRepository: typeof interviewNoteRep;

  #userRepository: typeof userRep;

  public constructor({ interviewNoteRepository, userRepository }: Constructor) {
    this.#interviewNoteRepository = interviewNoteRepository;
    this.#userRepository = userRepository;
  }

  public async getAll(
    interviewId: number,
  ): Promise<InterviewNoteGetAllResponseDto> {
    const items = await this.#interviewNoteRepository.getAll(interviewId);

    return { items };
  }

  public create(
    interviewNotCreateDto: InterviewNoteCreateRequestArgumentsDto,
  ): Promise<InterviewNoteGetAllItemResponseDto> {
    const { note, interviewId, authorId } = interviewNotCreateDto;

    return this.#interviewNoteRepository.create({
      note: sanitizeHTML(note),
      interviewId,
      authorId,
    });
  }
}

export { InterviewNote };
