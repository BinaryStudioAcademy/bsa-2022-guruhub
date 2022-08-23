// import { MentorForCategoryRequestDto } from '~/common/types/types';
import { mentorsToCourseCategories as mentorsToCourseCategoriesServ } from '~/services/services';

type Constructor = {
  mentorsToCourseCategoriesService: typeof mentorsToCourseCategoriesServ;
};

class Mentor {
  #mentorsToCourseCategoriesService: typeof mentorsToCourseCategoriesServ;

  public constructor({ mentorsToCourseCategoriesService }: Constructor) {
    this.#mentorsToCourseCategoriesService = mentorsToCourseCategoriesService;
  }

  // public async create({
  //   courseCategoryId,
  //   userId,
  // }: MentorForCategoryRequestDto) {
  //   const mentorByIdAndCourseCategory =
  //     await this.#mentorsToCourseCategoriesService.getByUserIdAndCourseCategoryId(
  //       { courseCategoryId, userId },
  //     );
  //   const hasPassedInterview = Boolean(mentorByIdAndCourseCategory);

  //   if (hasPassedInterview) {
  //
  //   }
  // }
}

export { Mentor };
