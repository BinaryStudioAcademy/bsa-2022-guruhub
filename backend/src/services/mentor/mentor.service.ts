import { MenteesToMentorsStatus } from '~/common/enums/enums';
import {
  CoursesToMentorsRequestDto,
  CoursesToMentorsResponseDto,
  MenteesToMentorsRequestDto,
  MenteesToMentorsResponseDto,
} from '~/common/types/types';
import { MentorsError } from '~/exceptions/exceptions';
import {
  courseModule as courseModuleServ,
  coursesToMentors as coursesToMentorsServ,
  menteesToMentors as menteesToMentorsServ,
  task as taskServ,
} from '~/services/services';

type Constructor = {
  menteesToMentorsService: typeof menteesToMentorsServ;
  coursesToMentorsService: typeof coursesToMentorsServ;
  courseModuleService: typeof courseModuleServ;
  taskService: typeof taskServ;
};

class Mentor {
  #menteesToMentorsService: typeof menteesToMentorsServ;

  #coursesToMentorsService: typeof coursesToMentorsServ;

  #courseModuleService: typeof courseModuleServ;

  #taskService: typeof taskServ;

  public constructor({
    menteesToMentorsService,
    coursesToMentorsService,
    courseModuleService,
    taskService,
  }: Constructor) {
    this.#menteesToMentorsService = menteesToMentorsService;
    this.#coursesToMentorsService = coursesToMentorsService;
    this.#courseModuleService = courseModuleService;
    this.#taskService = taskService;
  }

  public async chooseMentor({
    courseId,
    menteeId,
    mentorId,
  }: MenteesToMentorsRequestDto): Promise<MenteesToMentorsResponseDto> {
    const menteeToMentor =
      await this.#menteesToMentorsService.getByCourseIdAndMenteeId({
        courseId,
        menteeId,
      });

    const isMentee = Boolean(menteeToMentor);

    if (
      isMentee &&
      (menteeToMentor as MenteesToMentorsResponseDto).status !==
        MenteesToMentorsStatus.COMPLETED
    ) {
      throw new MentorsError();
    }

    if (isMentee) {
      return this.changeMentor({ courseId, menteeId, mentorId });
    }

    const newMenteeToMentor =
      await this.#menteesToMentorsService.createMenteesToMentors({
        courseId,
        menteeId,
        mentorId,
      });

    const modules = await this.#courseModuleService.getModulesByCourseId(
      courseId,
    );

    await Promise.all(
      modules.map((module) => {
        return this.#taskService.createTask({
          menteesToMentorsId: newMenteeToMentor.id,
          moduleId: module.id,
        });
      }),
    );

    return newMenteeToMentor;
  }

  public changeMentor(
    menteesToMentors: MenteesToMentorsRequestDto,
  ): Promise<MenteesToMentorsResponseDto> {
    return this.#menteesToMentorsService.changeMentor(menteesToMentors);
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

  public getMentor(menteesToMentors: {
    courseId: number;
    menteeId: number;
  }): Promise<MenteesToMentorsResponseDto | null> {
    return this.#menteesToMentorsService.getUncompletedByCourseIdAndMenteeId(
      menteesToMentors,
    );
  }

  public checkIsMentor({
    courseId,
    userId,
  }: CoursesToMentorsRequestDto): Promise<boolean> {
    return this.#coursesToMentorsService.checkIsMentor({
      courseId,
      userId,
    });
  }

  public checkHasMentor({
    courseId,
    userId,
  }: CoursesToMentorsRequestDto): Promise<boolean> {
    return this.#menteesToMentorsService.checkIsMentee({
      courseId,
      menteeId: userId,
    });
  }
}

export { Mentor };
