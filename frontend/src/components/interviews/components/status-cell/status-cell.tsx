import { FC } from 'common/types/types';
import { InterviewsTableRow } from 'components/interviews/common/types/types';
import { CellProps } from 'react-table';

import styles from './styles.module.scss';

const StatusCell: FC<CellProps<InterviewsTableRow>> = ({ value }) => {
  return <span className={`${styles.status} ${styles[value]}`}>{value}</span>;
};

export { StatusCell };
