import {
  CoursesToMentorsRequestDto,
  CoursesToMentorsResponseDto,
  MenteesToMentorsRequestDto,
  MenteesToMentorsResponseDto,
} from '~/common/types/types';
import {
  coursesToMentors as coursesToMentorsServ,
  menteesToMentors as menteesToMentorsServ,
} from '~/services/services';

type Constructor = {
  menteesToMentorsService: typeof menteesToMentorsServ;
  coursesToMentorsService: typeof coursesToMentorsServ;
};

class Mentor {
  #menteesToMentorsService: typeof menteesToMentorsServ;

  #coursesToMentorsService: typeof coursesToMentorsServ;

  public constructor({
    menteesToMentorsService,
    coursesToMentorsService,
  }: Constructor) {
    this.#menteesToMentorsService = menteesToMentorsService;
    this.#coursesToMentorsService = coursesToMentorsService;
  }

  public chooseMentor(
    menteesToMentors: MenteesToMentorsRequestDto,
  ): Promise<MenteesToMentorsResponseDto> {
    return this.#menteesToMentorsService.createMenteesToMentors(
      menteesToMentors,
    );
  }

  public addMentorToCourse({
    courseId,
    userId,
  }: CoursesToMentorsRequestDto): Promise<CoursesToMentorsResponseDto> {
    return this.#coursesToMentorsService.createMentorToCourse({
      courseId,
      userId,
    });
  }

  public async checkIsMentorOrHasMentor({
    courseId,
    userId,
  }: CoursesToMentorsRequestDto): Promise<boolean> {
    const courseToMentor =
      await this.#coursesToMentorsService.getByUserIdAndCourseId({
        courseId,
        userId,
      });

    const menteesToMentors =
      await this.#menteesToMentorsService.getByCourseIdAndMenteeId({
        courseId,
        menteeId: userId,
      });

    const isMentor = Boolean(courseToMentor);
    const hasMentor = Boolean(menteesToMentors);

    return isMentor || hasMentor;
  }
}

export { Mentor };
