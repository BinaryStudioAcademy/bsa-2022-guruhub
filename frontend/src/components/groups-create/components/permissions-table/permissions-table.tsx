import { FC, PermissionsGetAllItemResponseDto } from 'common/types/types';
import { Table } from 'components/common/common';
import { GroupCreationFieldsName } from 'components/groups-create/common/enums/enums';
import { useMemo } from 'hooks/hooks';
import { Column } from 'react-table';

import { PermissionsTableRow } from '../../common/types/types';
import { getPermissionsColumns } from '../../helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  permissions: PermissionsGetAllItemResponseDto[];
  onCheckboxToggle: (value: number) => void;
};

const PermissionsTable: FC<Props> = ({ permissions, onCheckboxToggle }) => {
  const columns = useMemo<Column<PermissionsTableRow>[]>(() => {
    return getPermissionsColumns({
      name: GroupCreationFieldsName.PERMISSION_IDS,
      onCheckboxToggle,
    });
  }, []);

  return (
    <div className={styles.groupPermissions}>
      <p className={styles.groupSubHeading}>Attach permissions policies</p>
      <Table data={permissions} columns={columns} />
    </div>
  );
};

export { PermissionsTable };
