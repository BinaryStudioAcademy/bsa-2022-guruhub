import { CourseUpdateCategoryRequestDto } from '~/common/types/types';

const getDefaultEditCourseCategoryPayload = (
  defaultCategoryId?: number,
): CourseUpdateCategoryRequestDto => {
  return <CourseUpdateCategoryRequestDto>{
    newCategoryId: defaultCategoryId,
  };
};

export { getDefaultEditCourseCategoryPayload };
