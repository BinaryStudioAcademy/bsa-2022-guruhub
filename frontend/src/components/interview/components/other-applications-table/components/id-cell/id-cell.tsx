import { AppRoute, PermissionKey } from 'common/enums/enums';
import { FC, UserWithPermissions } from 'common/types/types';
import { Link } from 'components/common/common';
import { OtherApplicationsTableRow } from 'components/interview/common/types/types';
import { checkHasPermission, generateDynamicPath } from 'helpers/helpers';
import { useAppSelector } from 'hooks/hooks';
import { CellProps } from 'react-table';

import styles from './styles.module.scss';

const IdCell: FC<CellProps<OtherApplicationsTableRow>> = ({ value }) => {
  const { user } = useAppSelector((state) => state.auth);

  const hasPermission = checkHasPermission({
    permissionKeys: [PermissionKey.MANAGE_INTERVIEWS],
    userPermissions: (user as UserWithPermissions).permissions,
  });

  if (!hasPermission) {
    return <span>#{value}</span>;
  }

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
