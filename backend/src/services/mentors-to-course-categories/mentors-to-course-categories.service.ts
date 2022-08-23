import {
  MentorForCategoryRequestDto,
  MentorForCategoryResponseDto,
} from '~/common/types/types';
import { mentorsToCourseCategories as mentorsToCourseCategoriesRep } from '~/data/repositories/repositories';

type Constructor = {
  mentorsToCourseCategoriesRepository: typeof mentorsToCourseCategoriesRep;
};

class MentorsToCourseCategories {
  #mentorsToCourseCategoriesRepository: typeof mentorsToCourseCategoriesRep;

  public constructor({ mentorsToCourseCategoriesRepository }: Constructor) {
    this.#mentorsToCourseCategoriesRepository =
      mentorsToCourseCategoriesRepository;
  }

  public createMentorToCourseCategory({
    courseCategoryId,
    userId,
  }: MentorForCategoryRequestDto): Promise<MentorForCategoryResponseDto | null> {
    return this.#mentorsToCourseCategoriesRepository.create({
      courseCategoryId,
      userId,
    });
  }

  public getByUserIdAndCourseCategoryId({
    courseCategoryId,
    userId,
  }: MentorForCategoryRequestDto): Promise<MentorForCategoryResponseDto | null> {
    return this.#mentorsToCourseCategoriesRepository.get({
      courseCategoryId,
      userId,
    });
  }
}

export { MentorsToCourseCategories };
