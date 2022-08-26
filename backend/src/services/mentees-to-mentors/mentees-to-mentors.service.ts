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
    const mentee = await this.getByCourseIdAndMenteeId({ courseId, menteeId });
    const isMentee = Boolean(mentee);

    if (isMentee) {
      throw new MenteesToMentorsError();
    }

    return this.#menteesToMentorsRepository.create(menteesToMentors);
  }

  public getByCourseIdAndMenteeId(menteesToMentors: {
    courseId: number;
    menteeId: number;
  }): Promise<MenteesToMentorsResponseDto | null> {
    return this.#menteesToMentorsRepository.getByCourseIdAndMenteeId(
      menteesToMentors,
    );
  }
}

export { MenteesToMentors };
