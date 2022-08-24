import {
  CoursesToMentorsResponseDto,
  MentorCreateRequestDto,
} from '~/common/types/types';
import { coursesToMentors as coursesToMentorsServ } from '~/services/services';

type Constructor = {
  coursesToMentorsService: typeof coursesToMentorsServ;
};

class Mentor {
  #coursesToMentorsService: typeof coursesToMentorsServ;

  public constructor({ coursesToMentorsService }: Constructor) {
    this.#coursesToMentorsService = coursesToMentorsService;
  }

  public create({
    courseId,
    userId,
  }: MentorCreateRequestDto): Promise<CoursesToMentorsResponseDto> {
    return this.#coursesToMentorsService.createMentorToCourse({
      courseId,
      userId,
    });
  }
}

export { Mentor };
