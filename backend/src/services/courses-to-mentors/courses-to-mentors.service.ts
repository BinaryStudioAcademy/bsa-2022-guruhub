import {
  CoursesToMentorsRequestDto,
  CoursesToMentorsResponseDto,
} from '~/common/types/types';
import { coursesToMentors as coursesToMentorsRep } from '~/data/repositories/repositories';
import { CoursesToMentorsError } from '~/exceptions/exceptions';

type Constructor = {
  coursesToMentorsRepository: typeof coursesToMentorsRep;
};

class CoursesToMentors {
  #coursesToMentorsRepository: typeof coursesToMentorsRep;

  public constructor({ coursesToMentorsRepository }: Constructor) {
    this.#coursesToMentorsRepository = coursesToMentorsRepository;
  }

  public async createMentorToCourse({
    courseId,
    userId,
  }: CoursesToMentorsRequestDto): Promise<CoursesToMentorsResponseDto> {
    const isMentor = await this.checkByUserIdAndCourseId({
      courseId,
      userId,
    });

    if (isMentor) {
      throw new CoursesToMentorsError();
    }

    return this.#coursesToMentorsRepository.createMentorToCourse({
      courseId,
      userId,
    });
  }

  public checkByUserIdAndCourseId({
    courseId,
    userId,
  }: CoursesToMentorsRequestDto): Promise<boolean> {
    return this.#coursesToMentorsRepository.checkByUserIdAndCourseId({
      courseId,
      userId,
    });
  }
}

export { CoursesToMentors };
