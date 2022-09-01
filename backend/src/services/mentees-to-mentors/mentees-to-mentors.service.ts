import {
  MenteesToMentorsRequestDto,
  MenteesToMentorsResponseDto,
} from '~/common/types/types';
import { menteesToMentors as menteesToMentorsRep } from '~/data/repositories/repositories';
import { MenteesToMentorsError } from '~/exceptions/exceptions';

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
      throw new MenteesToMentorsError();
    }

    return this.#menteesToMentorsRepository.create(menteesToMentors);
  }

  public checkIsMentee(menteesToMentors: {
    courseId: number;
    menteeId: number;
  }): Promise<boolean> {
    return this.#menteesToMentorsRepository.checkIsMentee(menteesToMentors);
  }
}

export { MenteesToMentors };
