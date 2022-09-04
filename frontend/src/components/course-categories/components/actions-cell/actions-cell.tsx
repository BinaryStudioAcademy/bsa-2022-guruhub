import { FC } from 'common/types/types';
import { IconButton } from 'components/common/common';
import { CellProps } from 'react-table';

import {
  CourseCategoriesTableActionsProps,
  CourseCategoriesTableRow,
} from '../../common/types/types';
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
