import { FC, PermissionsGetAllItemResponseDto } from 'common/types/types';
import { Table } from 'components/common/common';
import { GroupConfigureFieldsName } from 'components/uam-configure-group/common/enums/enums';
import { PermissionsTableRow } from 'components/uam-configure-group/common/types/types';
import { getPermissionsColumns } from 'components/uam-configure-group/helpers/helpers';
import { useMemo } from 'hooks/hooks';
import { Column } from 'react-table';

import styles from './styles.module.scss';

type Props = {
  permissions: PermissionsGetAllItemResponseDto[];
  onCheckboxToggle: (value: number) => void;
  selectedPermissionIds: number[];
};

const PermissionsTable: FC<Props> = ({
  permissions,
  onCheckboxToggle,
  selectedPermissionIds,
}) => {
  const columns = useMemo<Column<PermissionsTableRow>[]>(() => {
    return getPermissionsColumns({
      name: GroupConfigureFieldsName.PERMISSION_IDS,
      onCheckboxToggle,
      selectedPermissionIds,
    });
  }, [selectedPermissionIds]);

  return (
    <div className={styles.groupPermissions}>
      <p className={styles.groupSubHeading}>Attach permissions policies</p>
      <Table data={permissions} columns={columns} />
    </div>
  );
};

export { PermissionsTable };
