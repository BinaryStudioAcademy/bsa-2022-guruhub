import { CourseUpdateMentoringDto, FC } from 'common/types/types';
import { Input } from 'components/common/common';
import {
  CoursesMentoringTableActionsProps,
  CoursesMentoringTableRow,
} from 'components/my-courses/common/types/types';
import { getNameOf } from 'helpers/helpers';
import { useAppForm } from 'hooks/hooks';
import { CellProps } from 'react-table';
import { courseMentoringUpdateCount as courseMentoringUpdateCountValidationSchema } from 'validation-schemas/validation-schemas';

import styles from './styles.module.scss';

const StudentsCountCell: FC<
  CellProps<CoursesMentoringTableRow, CoursesMentoringTableActionsProps>
> = ({ value: { onEdit, course } }) => {
  const { control, errors, handleSubmit } =
    useAppForm<CourseUpdateMentoringDto>({
      defaultValues: {
        studentsCount: course.studentsCount,
        courseId: course.courseId,
      },
      validationSchema: courseMentoringUpdateCountValidationSchema.options({
        errors: { wrap: { label: false } },
      }),
    });

  return (
    <div className={styles.container}>
      <form className={styles.form} onBlur={handleSubmit(onEdit)}>
        <Input
          control={control}
          errors={errors}
          label="Students count"
          hasVisuallyHiddenLabel
          name={getNameOf<CourseUpdateMentoringDto>('studentsCount')}
          type="number"
          inputClassName={styles.inputStyled}
        />
      </form>
    </div>
  );
};

export { StudentsCountCell };
