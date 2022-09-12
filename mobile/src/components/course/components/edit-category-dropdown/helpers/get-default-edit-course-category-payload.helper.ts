import { CourseUpdateCategoryRequestDto } from '~/common/types/types';

const getDefaultEditCourseCategoryPayload = (
  defaultCategoryId: number | undefined,
): CourseUpdateCategoryRequestDto => {
  return <CourseUpdateCategoryRequestDto>{
    newCategoryId: defaultCategoryId,
  };
};

export { getDefaultEditCourseCategoryPayload };
