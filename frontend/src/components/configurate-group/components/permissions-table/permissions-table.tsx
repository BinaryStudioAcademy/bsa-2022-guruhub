import { FC, PermissionsGetAllItemResponseDto } from 'common/types/types';
import { Table } from 'components/common/common';
import { GroupConfigurateFieldsName } from 'components/configurate-group/common/enums/enums';
import { PermissionsTableRow } from 'components/configurate-group/common/types/types';
import { getPermissionsColumns } from 'components/configurate-group/helpers/helpers';
import { useMemo } from 'hooks/hooks';
import { Column } from 'react-table';

import styles from './styles.module.scss';

type Props = {
  permissions: PermissionsGetAllItemResponseDto[];
  onCheckboxToggle: (value: number) => void;
  defaultSelectedPermissionIds?: number[];
};

const PermissionsTable: FC<Props> = ({
  permissions,
  onCheckboxToggle,
  defaultSelectedPermissionIds = [],
}) => {
  const columns = useMemo<Column<PermissionsTableRow>[]>(() => {
    return getPermissionsColumns({
      name: GroupConfigurateFieldsName.PERMISSION_IDS,
      onCheckboxToggle,
      defaultSelectedPermissionIds,
    });
  }, [defaultSelectedPermissionIds]);

  return (
    <div className={styles.groupPermissions}>
      <p className={styles.groupSubHeading}>Attach permissions policies</p>
      <Table data={permissions} columns={columns} />
    </div>
  );
};

export { PermissionsTable };
