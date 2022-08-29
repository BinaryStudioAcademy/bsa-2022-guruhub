import { PaginationDefaultValue } from 'common/enums/enums';
import { FC, UsersGetResponseDto } from 'common/types/types';
import { Pagination, Table } from 'components/common/common';
import { GroupConfigureFieldsName } from 'components/uam-configure-group/common/enums/enums';
import { GroupConfigureUsersTableRow } from 'components/uam-configure-group/common/types/types';
import {
  getUserColumns,
  getUserTableData,
} from 'components/uam-configure-group/helpers/helpers';
import { useAppSelector, useMemo } from 'hooks/hooks';
import { Column } from 'react-table';

import styles from './styles.module.scss';

type Props = {
  users: UsersGetResponseDto[];
  onCheckboxToggle: (value: number) => void;
  selectedUserIds: number[];
  page: number;
  onPageChange: (page: number) => void;
};

const UsersTable: FC<Props> = ({
  users,
  onCheckboxToggle,
  selectedUserIds,
  page,
  onPageChange,
}) => {
  const { usersTotalCount } = useAppSelector(
    (state) => state.uamConfigureGroup,
  );
  const columns = useMemo<Column<GroupConfigureUsersTableRow>[]>(() => {
    return getUserColumns({
      name: GroupConfigureFieldsName.USER_IDS,
      onCheckboxToggle,
      selectedUserIds,
    });
  }, [selectedUserIds]);

  const usersData = useMemo<GroupConfigureUsersTableRow[]>(() => {
    return getUserTableData(users);
  }, [users]);

  return (
    <div className={styles.groupWorkers}>
      <p className={styles.groupSubHeading}>
        Add users to the Group - Optional
      </p>
      <Table data={usersData} columns={columns} />
      <Pagination
        currentPage={page}
        onPageChange={onPageChange}
        pageSize={PaginationDefaultValue.DEFAULT_COUNT}
        totalCount={usersTotalCount}
      />
    </div>
  );
};

export { UsersTable };
