import { FC } from 'common/types/types';
import { IconButton } from 'components/common/common';
import {
  CourseCategoriesTableActionsProps,
  CourseCategoriesTableRow,
} from 'components/course-categories/common/types/types';
import { CellProps } from 'react-table';

import styles from './styles.module.scss';

const ActionsCell: FC<
  CellProps<CourseCategoriesTableRow, CourseCategoriesTableActionsProps>
> = ({ value: { course, onEdit } }) => {
  const handleEdit = (): void => {
    onEdit(course);
  };

  return (
    <div className={styles.container}>
      <IconButton iconName="settings" onClick={handleEdit} label="Edit" />
    </div>
  );
};

export { ActionsCell };
