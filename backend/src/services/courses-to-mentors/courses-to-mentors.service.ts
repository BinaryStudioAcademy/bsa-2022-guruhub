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
    const courseToMentor = await this.getByUserIdAndCourseId({
      courseId,
      userId,
    });
    const isMentor = Boolean(courseToMentor);

    if (isMentor) {
      throw new CoursesToMentorsError();
    }

    return this.#coursesToMentorsRepository.createMentorToCourse({
      courseId,
      userId,
    });
  }

  public getByUserIdAndCourseId({
    courseId,
    userId,
  }: CoursesToMentorsRequestDto): Promise<CoursesToMentorsResponseDto | null> {
    return this.#coursesToMentorsRepository.getByUserIdAndCourseId({
      courseId,
      userId,
    });
  }
}

export { CoursesToMentors };
