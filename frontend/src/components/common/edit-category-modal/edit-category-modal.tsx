import {
  CategoryGetAllItemResponseDto,
  CourseUpdateCategoryRequestDto,
  FC,
  SelectorOption,
} from 'common/types/types';
import { Button, Modal, Select } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import { useAppForm, useMemo } from 'hooks/hooks';
import { courseUpdateCategory as courseUpdateCategoryValidationSchema } from 'validation-schemas/validation-schemas';

import { getDefaultUpdateCourseCategoryPayload } from './common';
import { getCategoriesOptions } from './helpers/helpers';
import styles from './styles.module.scss';

const DEFAULT_CATEGORY_ID = 1;

type Props = {
  courseId: number;
  defaultCategoryId: number | undefined;
  isOpen: boolean;
  categories: CategoryGetAllItemResponseDto[];
  onModalToggle: (evt?: React.MouseEvent) => void;
  onEditCategorySubmit: (payload: CourseUpdateCategoryRequestDto) => void;
};

const EditCategoryModal: FC<Props> = ({
  defaultCategoryId,
  isOpen,
  categories,
  onModalToggle,
  onEditCategorySubmit,
}) => {
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

  return (
    <Modal isOpen={isOpen} onClose={onModalToggle} title="Select new category">
      <form onSubmit={handleSubmit(onEditCategorySubmit)}>
        <div>
          <Select
            options={categoriesOptions}
            control={control}
            errors={errors}
            name={getNameOf<CourseUpdateCategoryRequestDto>('newCategoryId')}
            label="Course categories"
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button type="submit" label="Edit" btnColor="blue" />
        </div>
      </form>
    </Modal>
  );
};

export { EditCategoryModal };
