import {
  CategoryGetAllItemResponseDto,
  CourseUpdateCategoryRequestDto,
  FC,
} from 'common/types/types';
import { Button, Modal, Select } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import { useAppForm } from 'hooks/hooks';
// import { courseActions } from 'store/actions';
import { courseCreate as courseCreateValidationSchema } from 'validation-schemas/validation-schemas';

import { getDefaultUpdateCourseCategoryPayload } from './common';
import { getCategoriesOptions } from './helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  categories: CategoryGetAllItemResponseDto[];
  defaultId: number;
  isModalOpen: boolean;
  onModalToggle: () => void;
};

const AddCategoriesModal: FC<Props> = ({
  categories,
  defaultId,
  isModalOpen,
  onModalToggle,
}) => {
  // const dispatch = useAppDispatch();

  const { control, errors, handleSubmit } =
    useAppForm<CourseUpdateCategoryRequestDto>({
      defaultValues: getDefaultUpdateCourseCategoryPayload(defaultId),
      validationSchema: courseCreateValidationSchema,
    });

  const categoriesOptions = getCategoriesOptions(categories);

  const onSubmit = (payload: CourseUpdateCategoryRequestDto): void => {
    console.log(payload);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onModalToggle}
      title="Select new category"
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
        <div className={styles.formContent}>
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

export { AddCategoriesModal };
