import { CourseUpdateCategoryRequestDto } from '~/common/types/types';

const getDefaultUpdateCourseCategoryPayload = (
  defaultId: number,
): CourseUpdateCategoryRequestDto => ({
  newCategoryId: defaultId,
});
export { getDefaultUpdateCourseCategoryPayload };
