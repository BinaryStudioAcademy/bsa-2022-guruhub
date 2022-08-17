import { FC, UsersGetResponseDto } from 'common/types/types';
import { Table } from 'components/common/common';
import { GroupConfigurateFieldsName } from 'components/configurate-group/common/enums/enums';
import { GroupConfigurateUsersTableRow } from 'components/configurate-group/common/types/types';
import { getUserColumns } from 'components/configurate-group/helpers/helpers';
import { useMemo } from 'hooks/hooks';
import { Column } from 'react-table';

import styles from './styles.module.scss';

type Props = {
  users: UsersGetResponseDto[];
  onCheckboxToggle: (value: number) => void;
  defaultSelectedUserIds?: number[];
};

const UsersTable: FC<Props> = ({
  users,
  onCheckboxToggle,
  defaultSelectedUserIds = [],
}) => {
  const columns = useMemo<Column<GroupConfigurateUsersTableRow>[]>(() => {
    return getUserColumns({
      name: GroupConfigurateFieldsName.USER_IDS,
      onCheckboxToggle,
      defaultSelectedUserIds,
    });
  }, [defaultSelectedUserIds]);

  return (
    <div className={styles.groupWorkers}>
      <p className={styles.groupSubHeading}>
        Add users to the Group - Optional
      </p>
      <Table data={users} columns={columns} />
      <span className={styles.groupWorkersAmount}>{users.length} results</span>
    </div>
  );
};

export { UsersTable };
