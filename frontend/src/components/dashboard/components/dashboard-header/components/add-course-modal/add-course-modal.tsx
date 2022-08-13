import { CourseCreateByUrlRequestDto, FC } from 'common/types/types';
import { Button, Input } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import { useAppDispatch, useAppForm } from 'hooks/hooks';
import { coursesActions } from 'store/actions';
import { courseCreate as courseCreateValidationSchema } from 'validation-schemas/validation-schemas';

import { DEFAULT_CREATE_COURSE_PAYLOAD } from './common';
import styles from './styles.module.scss';

type Props = {
  onModalToggle: () => void;
};

const AddCourseModal: FC<Props> = ({ onModalToggle }) => {
  const { control, errors, handleSubmit } =
    useAppForm<CourseCreateByUrlRequestDto>({
      defaultValues: DEFAULT_CREATE_COURSE_PAYLOAD,
      validationSchema: courseCreateValidationSchema,
    });

  const dispatch = useAppDispatch();

  const onSubmit = (payload: CourseCreateByUrlRequestDto): void => {
    dispatch(coursesActions.addCourse(payload)).then(onModalToggle);
  };

  return (
    <div>
      <h3>Import</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
        <div className={styles.formContent}>
          <Input
            type="text"
            label="Place the link"
            name={getNameOf<CourseCreateByUrlRequestDto>('url')}
            control={control}
            errors={errors}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button type="submit" label="Submit course" />
        </div>
      </form>
    </div>
  );
};

export { AddCourseModal };
