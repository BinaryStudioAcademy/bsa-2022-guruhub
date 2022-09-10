import {
  MenteesToMentorsChangeStatusRequestDto,
  MenteesToMentorsRequestDto,
  MenteesToMentorsResponseDto,
} from '~/common/types/types';
import { menteesToMentors as menteesToMentorsRep } from '~/data/repositories/repositories';

type Constructor = {
  menteesToMentorsRepository: typeof menteesToMentorsRep;
};

class MenteesToMentors {
  #menteesToMentorsRepository: typeof menteesToMentorsRep;

  public constructor({ menteesToMentorsRepository }: Constructor) {
    this.#menteesToMentorsRepository = menteesToMentorsRepository;
  }

  public async createMenteesToMentors(
    menteesToMentors: MenteesToMentorsRequestDto,
  ): Promise<MenteesToMentorsResponseDto> {
    const { courseId, menteeId } = menteesToMentors;
    const isMentee = await this.checkIsMentee({
      courseId,
      menteeId,
    });

    if (isMentee) {
      return this.#menteesToMentorsRepository.changeMentor(menteesToMentors);
    }

    return this.#menteesToMentorsRepository.create(menteesToMentors);
  }

  public async changeMentor(
    menteesToMentors: MenteesToMentorsRequestDto,
  ): Promise<MenteesToMentorsResponseDto> {
    return this.#menteesToMentorsRepository.changeMentor(menteesToMentors);
  }

  public checkIsMentee(menteesToMentors: {
    courseId: number;
    menteeId: number;
  }): Promise<boolean> {
    return this.#menteesToMentorsRepository.checkIsMentee(menteesToMentors);
  }

  public getByCourseIdAndMenteeId(menteesToMentors: {
    courseId: number;
    menteeId: number;
  }): Promise<MenteesToMentorsResponseDto | null> {
    return this.#menteesToMentorsRepository.getByCourseIdAndMenteeId(
      menteesToMentors,
    );
  }

  public changeStatus({
    id,
    status,
  }: MenteesToMentorsChangeStatusRequestDto): Promise<number> {
    return this.#menteesToMentorsRepository.changeStatus({ id, status });
  }
}

export { MenteesToMentors };
