import { FC, UsersGetResponseDto } from 'common/types/types';
import { Table } from 'components/common/common';
import { GroupCreationFieldsName } from 'components/groups-create/common/enums/enums';
import { useMemo } from 'hooks/hooks';
import { Column } from 'react-table';

import { GroupCreationUsersTableRow } from '../../common/types/types';
import { getUserColumns } from '../../helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  users: UsersGetResponseDto[];
  onCheckboxToggle: (value: number) => void;
};

const UsersTable: FC<Props> = ({ users, onCheckboxToggle }) => {
  const columns = useMemo<Column<GroupCreationUsersTableRow>[]>(() => {
    return getUserColumns({
      name: GroupCreationFieldsName.USER_IDS,
      onCheckboxToggle,
    });
  }, []);

  return (
    <div className={styles.groupWorkers}>
      <p className={styles.groupSubHeading}>
        Add workers to the Group - Optional
      </p>
      <Table data={users} columns={columns} />
      <span className={styles.groupWorkersAmount}>{users.length} results</span>
    </div>
  );
};

export { UsersTable };
