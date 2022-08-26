import { InterviewNoteGetAllItemResponseDto } from 'guruhub-shared';

import { InterviewNoteCreateRequestArgumentsDto } from '~/common/types/types';
import {
  interviewNote as interviewNoteRep,
  user as userRep,
} from '~/data/repositories/repositories';
import { InterviewNoteError } from '~/exceptions/exceptions';
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
  ): Promise<InterviewNoteGetAllItemResponseDto[]> {
    return this.#interviewNoteRepository.getAll(interviewId);
  }

  public async create(
    interviewNotCreateDto: InterviewNoteCreateRequestArgumentsDto,
  ): Promise<InterviewNoteGetAllItemResponseDto> {
    const { note, interviewId, authorId } = interviewNotCreateDto;

    const createdNote = await this.#interviewNoteRepository.create({
      note: sanitizeHTML(note),
      interviewId,
      authorId,
    });
    const author = await this.#userRepository.getById(`${authorId}`);

    if (!author) {
      throw new InterviewNoteError();
    }

    return {
      ...createdNote,
      author,
    };
  }
}

export { InterviewNote };
