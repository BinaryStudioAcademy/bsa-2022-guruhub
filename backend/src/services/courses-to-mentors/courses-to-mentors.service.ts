import {
  CoursesToMentorsRequestDto,
  CoursesToMentorsResponseDto,
} from '~/common/types/types';
import { coursesToModels as coursesToModelsRep } from '~/data/repositories/repositories';

type Constructor = {
  coursesToModelsRepository: typeof coursesToModelsRep;
};

class CoursesToMentors {
  #coursesToModelsRepository: typeof coursesToModelsRep;

  public constructor({ coursesToModelsRepository }: Constructor) {
    this.#coursesToModelsRepository = coursesToModelsRepository;
  }

  public createMentorToCourse({
    courseId,
    userId,
  }: CoursesToMentorsRequestDto): Promise<CoursesToMentorsResponseDto> {
    return this.#coursesToModelsRepository.createMentorToCourse({
      courseId,
      userId,
    });
  }
}

export { CoursesToMentors };
