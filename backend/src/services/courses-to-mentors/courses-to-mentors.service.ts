import {
  CoursesToMentorsRequestDto,
  CoursesToMentorsResponseDto,
} from '~/common/types/types';
import { coursesToModels as coursesToModelsRep } from '~/data/repositories/repositories';
import { CoursesToMentorsError } from '~/exceptions/exceptions';

type Constructor = {
  coursesToModelsRepository: typeof coursesToModelsRep;
};

class CoursesToMentors {
  #coursesToModelsRepository: typeof coursesToModelsRep;

  public constructor({ coursesToModelsRepository }: Constructor) {
    this.#coursesToModelsRepository = coursesToModelsRepository;
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

    return this.#coursesToModelsRepository.createMentorToCourse({
      courseId,
      userId,
    });
  }

  public getByUserIdAndCourseId({
    courseId,
    userId,
  }: CoursesToMentorsRequestDto): Promise<CoursesToMentorsResponseDto | null> {
    return this.#coursesToModelsRepository.getByUserIdAndCourseId({
      courseId,
      userId,
    });
  }
}

export { CoursesToMentors };
