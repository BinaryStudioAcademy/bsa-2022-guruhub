import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Link } from 'components/common/common';
import { OtherApplicationsTableRow } from 'components/interview/common/types/types';
import { CellProps } from 'react-table';

import styles from './styles.module.scss';

const IdCell: FC<CellProps<OtherApplicationsTableRow>> = ({ value }) => {
  return (
    <Link
      to={`${AppRoute.INTERVIEW}/${value}` as AppRoute}
      className={styles.idLink}
    >
      {value}
    </Link>
  );
};

export { IdCell };
