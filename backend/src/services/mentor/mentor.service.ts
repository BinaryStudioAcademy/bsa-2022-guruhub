import { ExceptionMessage } from '~/common/enums/enums';
import {
  CourseCategoryPriceGetAllItemResponseDto,
  CourseGetResponseDto,
  CoursesToMentorsRequestDto,
  CoursesToMentorsResponseDto,
  MenteesToMentorsRequestDto,
  MenteesToMentorsResponseDto,
} from '~/common/types/types';
import { BillingError } from '~/exceptions/exceptions';
import {
  billing as billingServ,
  course as courseServ,
  courseCategoryPrice as courseCategoryPriceServ,
  courseModule as courseModuleServ,
  coursesToMentors as coursesToMentorsServ,
  menteesToMentors as menteesToMentorsServ,
  task as taskServ,
  user as userServ,
  userDetails as userDetailsServ,
} from '~/services/services';

const DEFAULT_STUDYING_PRICE_COEFFICIENT = 0.5;

type Constructor = {
  billingService: typeof billingServ;
  courseService: typeof courseServ;
  coursesToMentorsService: typeof coursesToMentorsServ;
  courseModuleService: typeof courseModuleServ;
  courseCategoryPriceService: typeof courseCategoryPriceServ;
  menteesToMentorsService: typeof menteesToMentorsServ;
  taskService: typeof taskServ;
  userService: typeof userServ;
  userDetailsService: typeof userDetailsServ;
};

class Mentor {
  #billingService: typeof billingServ;

  #courseService: typeof courseServ;

  #coursesToMentorsService: typeof coursesToMentorsServ;

  #courseModuleService: typeof courseModuleServ;

  #courseCategoryPriceService: typeof courseCategoryPriceServ;

  #menteesToMentorsService: typeof menteesToMentorsServ;

  #taskService: typeof taskServ;

  #userService: typeof userServ;

  #userDetailsService: typeof userDetailsServ;

  public constructor({
    billingService,
    menteesToMentorsService,
    courseService,
    coursesToMentorsService,
    courseModuleService,
    courseCategoryPriceService,
    taskService,
    userService,
    userDetailsService,
  }: Constructor) {
    this.#billingService = billingService;
    this.#menteesToMentorsService = menteesToMentorsService;
    this.#courseService = courseService;
    this.#coursesToMentorsService = coursesToMentorsService;
    this.#courseModuleService = courseModuleService;
    this.#courseCategoryPriceService = courseCategoryPriceService;
    this.#taskService = taskService;
    this.#userService = userService;
    this.#userDetailsService = userDetailsService;
  }

  public async chooseMentor({
    courseId,
    menteeId,
    mentorId,
  }: MenteesToMentorsRequestDto): Promise<MenteesToMentorsResponseDto> {
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
      await this.#courseCategoryPriceService.getByCategoryId(
        (courseDto as CourseGetResponseDto).courseCategoryId,
      );

    const menteeToChooseTheMentor =
      await this.#userService.getByIdWithMoneyBalance(menteeId);
    const courseModules = await this.#courseModuleService.getModulesByCourseId(
      courseId,
    );

    const priceOfStudying =
      courseModules.length *
      (courseCategoryPriceDto as CourseCategoryPriceGetAllItemResponseDto)
        .price *
      DEFAULT_STUDYING_PRICE_COEFFICIENT;

    const menteeBalance = menteeToChooseTheMentor.userDetails.moneyBalance;

    if (menteeBalance < priceOfStudying) {
      throw new BillingError({
        message: ExceptionMessage.NOT_ENOUGH_FUNDS_TO_PAY_FOR_MENTORS_SERVICES,
      });
    }

    const newMenteeBalance = menteeBalance - priceOfStudying;

    await this.#userDetailsService.updateMoneyBalance(
      menteeId,
      newMenteeBalance,
    );

    const transaction = await this.#billingService.makeTransaction({
      senderId: menteeId,
      receiverId: mentorId,
      amount: priceOfStudying,
    });
    await this.#billingService.holdTransaction(transaction.id);
  }
}

export { Mentor };
