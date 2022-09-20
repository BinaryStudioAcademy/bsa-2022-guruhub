import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Link } from 'components/common/common';
import {
  OtherApplicationsCellProps,
  OtherApplicationsTableRow,
} from 'components/interview/common/types/types';
import { generateDynamicPath } from 'helpers/helpers';
import { CellProps } from 'react-table';

import styles from './styles.module.scss';

const IdCell: FC<
  CellProps<OtherApplicationsTableRow, OtherApplicationsCellProps>
> = ({ value: { id, hasPermission } }) => {
  if (!hasPermission) {
    return <span>#{id}</span>;
  }

  return (
    <Link
      to={generateDynamicPath(AppRoute.INTERVIEWS_$ID, { id })}
      className={styles.idLink}
    >
      #{id}
    </Link>
  );
};

export { IdCell };
