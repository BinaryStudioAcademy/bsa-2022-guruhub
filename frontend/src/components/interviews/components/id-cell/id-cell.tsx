import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Link } from 'components/common/common';
import { InterviewsTableRow } from 'components/interviews/common/types/types';
import { CellProps } from 'react-table';

import styles from './styles.module.scss';

const IdCell: FC<CellProps<InterviewsTableRow>> = ({ value }) => {
  return (
    <Link
      to={`${AppRoute.INTERVIEW}/${value}` as AppRoute}
      className={styles.id_link}
    >
      {value}
    </Link>
  );
};

export { IdCell };
