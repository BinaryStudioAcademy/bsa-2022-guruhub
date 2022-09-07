import { CourseCreateRequestDto, FC } from 'common/types/types';
import { Button, Input, Modal } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import { useAppDispatch, useAppForm } from 'hooks/hooks';
import { dashboardActions } from 'store/actions';
import { courseCreate as courseCreateValidationSchema } from 'validation-schemas/validation-schemas';

import { DEFAULT_CREATE_COURSE_PAYLOAD } from './common';
import styles from './styles.module.scss';

type Props = {
  isModalOpen: boolean;
  onModalToggle: () => void;
};

const AddCourseModal: FC<Props> = ({ isModalOpen, onModalToggle }) => {
  const { control, errors, handleSubmit, reset } =
    useAppForm<CourseCreateRequestDto>({
      defaultValues: DEFAULT_CREATE_COURSE_PAYLOAD,
      validationSchema: courseCreateValidationSchema,
    });

  const dispatch = useAppDispatch();

  const onSubmit = (payload: CourseCreateRequestDto): void => {
    onModalToggle();
    dispatch(dashboardActions.addCourse(payload));
    reset();
  };

  return (
    <Modal isOpen={isModalOpen} onClose={onModalToggle} title="Add new course">
      <h3>Import</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
        <div className={styles.formContent}>
          <Input
            type="text"
            label="Place the link"
            name={getNameOf<CourseCreateRequestDto>('url')}
            control={control}
            errors={errors}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button type="submit" label="Submit course" btnColor="blue" />
        </div>
      </form>
    </Modal>
  );
};

export { AddCourseModal };
