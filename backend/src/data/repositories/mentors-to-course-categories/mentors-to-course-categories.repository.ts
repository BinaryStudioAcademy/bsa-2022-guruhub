import { MentorsToCourseCategoriesRequestDto } from '~/common/types/types';
import { MentorsToCourseCategories as MentorsToCourseCategoriesM } from '~/data/models/models';

type Constructor = {
  MentorsToCourseCategoriesModel: typeof MentorsToCourseCategoriesM;
};

class MentorsToCourseCategories {
  #MentorsToCourseCategoriesModel: typeof MentorsToCourseCategoriesM;

  public constructor({ MentorsToCourseCategoriesModel }: Constructor) {
    this.#MentorsToCourseCategoriesModel = MentorsToCourseCategoriesModel;
  }

  public create({
    courseCategoryId,
    userId,
  }: MentorsToCourseCategoriesRequestDto): Promise<MentorsToCourseCategoriesM> {
    return this.#MentorsToCourseCategoriesModel
      .query()
      .insert({ courseCategoryId, userId })
      .execute();
  }

  public async get({
    courseCategoryId,
    userId,
  }: MentorsToCourseCategoriesRequestDto): Promise<MentorsToCourseCategoriesM | null> {
    const mentorForCategory = await this.#MentorsToCourseCategoriesModel
      .query()
      .where({ userId })
      .andWhere({ courseCategoryId })
      .first();

    return mentorForCategory ?? null;
  }
}

export { MentorsToCourseCategories };
