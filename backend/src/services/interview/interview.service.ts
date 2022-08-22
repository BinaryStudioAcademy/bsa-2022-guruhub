import {
  InterviewsByIdResponseDto,
  InterviewsGetAllResponseDto,
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

  public async getAll(): Promise<InterviewsGetAllResponseDto> {
    const interviews = await this.#interviewRepository.getAll();

    return {
      items: interviews.map((interview) => ({
        id: interview.id,
        interviewDate: interview.interviewDate,
        status: interview.status,
        interviewee: {
          id: interview.interviewee.id,
          fullName: interview.interviewee.fullName,
          email: interview.interviewee.email,
          createdAt: interview.interviewee.createdAt,
        },
        interviewer: {
          id: interview.interviewer.id,
          fullName: interview.interviewer.fullName,
          email: interview.interviewer.email,
          createdAt: interview.interviewer.createdAt,
        },
        courseCategory: {
          id: interview.courseCategory.id,
          key: interview.courseCategory.key,
          name: interview.courseCategory.name,
        },
      })),
    };
  }

  public async getById(id: number): Promise<InterviewsByIdResponseDto | null> {
    const interview = await this.#interviewRepository.getById(id);

    if (!interview) {
      return null;
    }

    return {
      id: interview.id,
      interviewDate: interview.interviewDate,
      status: interview.status,
      interviewee: {
        id: interview.interviewee.id,
        fullName: interview.interviewee.fullName,
        email: interview.interviewee.email,
        createdAt: interview.interviewee.createdAt,
      },
      interviewer: {
        id: interview.interviewer.id,
        fullName: interview.interviewer.fullName,
        email: interview.interviewer.email,
        createdAt: interview.interviewer.createdAt,
      },
      courseCategory: {
        id: interview.courseCategory.id,
        key: interview.courseCategory.key,
        name: interview.courseCategory.name,
      },
    };
  }
}

export { Interview };
