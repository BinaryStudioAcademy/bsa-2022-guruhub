import { ExceptionMessage } from '~/common/enums/enums';
import {
  CourseCategoryPriceGetAllItemResponseDto,
  CourseGetResponseDto,
  CoursesToMentorsRequestDto,
  CoursesToMentorsResponseDto,
  MenteesToMentorsRequestDto,
  MenteesToMentorsResponseDto,
} from '~/common/types/types';
import { MenteesToMentorsError } from '~/exceptions/exceptions';
import {
  billing as billingServ,
  course as courseServ,
  courseCategory as courseCategoryServ,
  courseModule as courseModuleServ,
  coursesToMentors as coursesToMentorsServ,
  menteesToMentors as menteesToMentorsServ,
  task as taskServ,
} from '~/services/services';

type Constructor = {
  billingService: typeof billingServ;
  courseService: typeof courseServ;
  coursesToMentorsService: typeof coursesToMentorsServ;
  courseModuleService: typeof courseModuleServ;
  courseCategoryService: typeof courseCategoryServ;
  menteesToMentorsService: typeof menteesToMentorsServ;
  taskService: typeof taskServ;
};

class Mentor {
  #billingService: typeof billingServ;

  #courseService: typeof courseServ;

  #coursesToMentorsService: typeof coursesToMentorsServ;

  #courseModuleService: typeof courseModuleServ;

  #courseCategoryService: typeof courseCategoryServ;

  #menteesToMentorsService: typeof menteesToMentorsServ;

  #taskService: typeof taskServ;

  public constructor({
    billingService,
    menteesToMentorsService,
    courseService,
    coursesToMentorsService,
    courseModuleService,
    courseCategoryService: courseCategoryPriceService,
    taskService,
  }: Constructor) {
    this.#billingService = billingService;
    this.#menteesToMentorsService = menteesToMentorsService;
    this.#courseService = courseService;
    this.#coursesToMentorsService = coursesToMentorsService;
    this.#courseModuleService = courseModuleService;
    this.#courseCategoryService = courseCategoryPriceService;
    this.#taskService = taskService;
  }

  public async chooseMentor({
    courseId,
    menteeId,
    mentorId,
  }: MenteesToMentorsRequestDto): Promise<MenteesToMentorsResponseDto> {
    const menteeIsMentor = await this.#coursesToMentorsService.checkIsMentor({
      courseId,
      userId: menteeId,
    });

    if (menteeIsMentor) {
      throw new MenteesToMentorsError({
        message: ExceptionMessage.MENTOR_CANT_BE_STUDENT,
      });
    }

    await this.payMentorService({ courseId, menteeId, mentorId });

    const menteeToMentor =
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
          menteesToMentorsId: menteeToMentor.id,
          moduleId: module.id,
        });
      }),
    );

    return menteeToMentor;
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

  public checkIsMentorForMentee(
    menteeToMentor: MenteesToMentorsRequestDto,
  ): Promise<boolean> {
    return this.#menteesToMentorsService.checkIsMentorForMentee(menteeToMentor);
  }

  private async payMentorService({
    courseId,
    menteeId,
    mentorId,
  }: MenteesToMentorsRequestDto): Promise<void> {
    const courseDto = await this.#courseService.getById(courseId);
    const courseCategoryPriceDto =
      await this.#courseCategoryService.getPriceDtoByCategoryId(
        (courseDto as CourseGetResponseDto).courseCategoryId,
      );

    const courseModulesCount =
      await this.#courseModuleService.getCourseModulesCount(courseId);

    const rawPriceOfStudying =
      courseModulesCount *
      (courseCategoryPriceDto as CourseCategoryPriceGetAllItemResponseDto)
        .price;

    await this.#billingService.initHoldStudentPayment({
      menteeId,
      mentorId,
      rawPriceOfStudying,
    });
  }
}

export { Mentor };
