import {
  MenteesToMentorsChangeStatusRequestDto,
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

  public getById(id: number): Promise<MenteesToMentorsResponseDto> {
    return this.#menteesToMentorsRepository.getById(id);
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

  public checkIsMenteeForAnyCourse(userId: number): Promise<boolean> {
    return this.#menteesToMentorsRepository.checkIsMenteeForAnyCourse(userId);
  }

  public getUncompletedByCourseIdAndMenteeId(menteesToMentors: {
    courseId: number;
    menteeId: number;
  }): Promise<MenteesToMentorsResponseDto | null> {
    return this.#menteesToMentorsRepository.getUncompletedByCourseIdAndMenteeId(
      menteesToMentors,
    );
  }

  public changeStatus({
    id,
    status,
  }: MenteesToMentorsChangeStatusRequestDto): Promise<number> {
    return this.#menteesToMentorsRepository.changeStatus({ id, status });
  }

  public checkIsMentorForMentee(
    menteesToMentors: MenteesToMentorsRequestDto,
  ): Promise<boolean> {
    return this.#menteesToMentorsRepository.checkIsMentorForMentee(
      menteesToMentors,
    );
  }
}

export { MenteesToMentors };
