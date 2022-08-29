import { DropDownPayload } from '../../common/common';

const DEFAUTL_UPDATE_COURSE_CATEGORY_PAYLOAD = null;

const getDefaultValueforDropDown = (
  id: number | undefined,
): DropDownPayload => {
  return { newCategoryId: id ?? DEFAUTL_UPDATE_COURSE_CATEGORY_PAYLOAD };
};

export { getDefaultValueforDropDown };
