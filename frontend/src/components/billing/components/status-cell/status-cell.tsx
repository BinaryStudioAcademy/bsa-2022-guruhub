import { FC } from 'common/types/types';
import { TransactionsTableRow } from 'components/billing/common/types/types';
import { getValidClasses } from 'helpers/helpers';
import { CellProps } from 'react-table';

import styles from './styles.module.scss';

const StatusCell: FC<CellProps<TransactionsTableRow>> = ({ value }) => {
  return (
    <span className={getValidClasses(styles.status, styles[value])}>
      {value}
    </span>
  );
};

export { StatusCell };
