import { CourseUpdateMentoringDto, FC } from 'common/types/types';
import { Input } from 'components/common/common';
import { CoursesMentoringTableAccessor } from 'components/my-courses/common/enums/enums';
import {
  CoursesMentoringTableActionsProps,
  CoursesMentoringTableRow,
} from 'components/my-courses/common/types/types';
import { useAppForm } from 'hooks/hooks';
import { CellProps } from 'react-table';

import styles from './styles.module.scss';

const ActionsCell: FC<
  CellProps<CoursesMentoringTableRow, CoursesMentoringTableActionsProps>
> = ({ value: { onEdit, course } }) => {
  const { control, errors, getValues } = useAppForm<CourseUpdateMentoringDto>({
    defaultValues: {
      maxStudentsCount: course.maxStudentsCount,
      courseId: course.courseId,
    },
  });

  const handleEdit = (): void => {
    onEdit({
      courseId: getValues('courseId'),
      maxStudentsCount: getValues('maxStudentsCount'),
    });
  };

  return (
    <div className={styles.container}>
      <form onBlur={handleEdit}>
        <Input
          control={control}
          errors={errors}
          label="Students count"
          hasVisuallyHiddenLabel
          name={CoursesMentoringTableAccessor.STUDENTS_COUNT}
          type="number"
          inputClassName={styles.inputStyled}
        />
      </form>
    </div>
  );
};

export { ActionsCell };
