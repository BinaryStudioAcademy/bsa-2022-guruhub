import {
  InterviewResponseDto,
  InterviewsResponseDto,
} from '~/common/types/types';
import { interview as interviewRep } from '~/data/repositories/repositories';

type Constructor = {
  interviewRepository: typeof interviewRep;
};

class Interview {
  #interviewRepository: typeof interviewRep;

  public constructor({ interviewRepository }: Constructor) {
    this.#interviewRepository = interviewRepository;
  }

  public async getAll(): Promise<InterviewsResponseDto> {
    const interviews = await this.#interviewRepository.getAll();

    return {
      items: interviews.map((interview) => ({
        ...interview,
      })),
    };
  }

  public async getById(id: number): Promise<InterviewResponseDto | null> {
    const interview = await this.#interviewRepository.getById(id);

    if (!interview) {
      return null;
    }

    return interview;
  }
}

export { Interview };
