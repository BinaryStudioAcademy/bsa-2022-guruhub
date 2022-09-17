import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Link } from 'components/common/common';
import { InterviewsTableRow } from 'components/interviews/common/types/types';
import { generateDynamicPath } from 'helpers/helpers';
import { CellProps } from 'react-table';

import styles from './styles.module.scss';

const IdCell: FC<CellProps<InterviewsTableRow>> = ({ value }) => {
  return (
    <Link
      to={generateDynamicPath(AppRoute.INTERVIEWS_$ID, { id: value })}
      className={styles.idLink}
    >
      #{value}
    </Link>
  );
};

export { IdCell };
