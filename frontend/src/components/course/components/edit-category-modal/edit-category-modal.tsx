import {
  CategoryGetAllItemResponseDto,
  CourseUpdateCategoryRequestDto,
  FC,
  SelectorOption,
} from 'common/types/types';
import { Button, Modal, Select } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import { useAppDispatch, useAppForm, useMemo } from 'hooks/hooks';
import { courseActions, courseCategoriesActions } from 'store/actions';
import { courseUpdateCategory as courseUpdateCategoryValidationSchema } from 'validation-schemas/validation-schemas';

import {
  AppRoute,
  PaginationDefaultValue,
} from '../../../../common/enums/enums';
import { useLocation } from '../../../../hooks/hooks';
import { getDefaultUpdateCourseCategoryPayload } from './common';
import { getCategoriesOptions } from './helpers/helpers';

const DEFAULT_CATEGORY_ID = 1;

type Props = {
  courseId: number;
  defaultCategoryId: number | undefined;
  isOpen: boolean;
  categories: CategoryGetAllItemResponseDto[];
  onModalToggle: (evt?: React.MouseEvent) => void;
};

const EditCategoryModal: FC<Props> = ({
  courseId,
  defaultCategoryId,
  isOpen,
  categories,
  onModalToggle,
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isCourseCategoriesPage =
    location.pathname === AppRoute.COURSE_CATEGORIES;

  const { control, errors, handleSubmit } =
    useAppForm<CourseUpdateCategoryRequestDto>({
      defaultValues: getDefaultUpdateCourseCategoryPayload(
        defaultCategoryId ?? DEFAULT_CATEGORY_ID,
      ),
      validationSchema: courseUpdateCategoryValidationSchema,
    });

  const categoriesOptions = useMemo<SelectorOption<string>[]>(() => {
    return getCategoriesOptions(categories);
  }, [categories]);

  const handleModalSubmit = (payload: CourseUpdateCategoryRequestDto): void => {
    const { newCategoryId } = payload;
    dispatch(courseActions.updateCategory({ courseId, newCategoryId }))
      .unwrap()
      .then(() => {
        if (isCourseCategoriesPage) {
          dispatch(
            courseCategoriesActions.getCourses({
              page: 1,
              count: PaginationDefaultValue.DEFAULT_COURSE_CATEGORIES_COUNT,
            }),
          );
        }
        onModalToggle();
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onModalToggle} title="Select new category">
      <form onSubmit={handleSubmit(handleModalSubmit)}>
        <div>
          <Select
            options={categoriesOptions}
            control={control}
            errors={errors}
            name={getNameOf<CourseUpdateCategoryRequestDto>('newCategoryId')}
            label="Course categories"
          />
        </div>
        <div>
          <Button type="submit" label="Edit" btnColor="blue" />
        </div>
      </form>
    </Modal>
  );
};

export { EditCategoryModal };
