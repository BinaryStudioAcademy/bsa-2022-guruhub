import { PaginationDefaultValue } from 'common/enums/enums';
import { FC, PermissionsGetAllItemResponseDto } from 'common/types/types';
import { Table } from 'components/common/common';
import { GroupConfigureFieldsName } from 'components/uam-configure-group/common/enums/enums';
import { PermissionsTableRow } from 'components/uam-configure-group/common/types/types';
import { getPermissionTableData } from 'components/uam-configure-group/helpers/get-permission-table-data-helper/get-permission-table-data.helper';
import { getPermissionsColumns } from 'components/uam-configure-group/helpers/helpers';
import { useMemo } from 'hooks/hooks';
import { Column } from 'react-table';

import styles from './styles.module.scss';

type Props = {
  permissions: PermissionsGetAllItemResponseDto[];
  onCheckboxToggle: (value: number) => void;
  selectedPermissionIds: number[];
  page: number;
  onPageChange: (page: number) => void;
  permissionsTotalCount: number;
};

const PermissionsTable: FC<Props> = ({
  permissions,
  onCheckboxToggle,
  selectedPermissionIds,
  page,
  onPageChange,
  permissionsTotalCount,
}) => {
  const columns = useMemo<Column<PermissionsTableRow>[]>(() => {
    return getPermissionsColumns({
      name: GroupConfigureFieldsName.PERMISSION_IDS,
      onCheckboxToggle,
      selectedPermissionIds,
    });
  }, [selectedPermissionIds]);

  const permissionData = useMemo<PermissionsTableRow[]>(() => {
    return getPermissionTableData(permissions);
  }, [permissions]);

  return (
    <div className={styles.groupPermissions}>
      <p className={styles.groupSubHeading}>Attach permissions policies</p>
      <Table
        data={permissionData}
        columns={columns}
        currentPage={page}
        onPageChange={onPageChange}
        pageSize={PaginationDefaultValue.DEFAULT_COUNT}
        totalCount={permissionsTotalCount}
      />
    </div>
  );
};

export { PermissionsTable };
