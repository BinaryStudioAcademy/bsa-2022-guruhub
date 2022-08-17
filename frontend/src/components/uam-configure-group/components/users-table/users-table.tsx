import { PaginationDefaultValue } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Pagination, Table } from 'components/common/common';
import { GroupConfigureFieldsName } from 'components/uam-configure-group/common/enums/enums';
import { GroupConfigureUsersTableRow } from 'components/uam-configure-group/common/types/types';
import { getUserColumns } from 'components/uam-configure-group/helpers/helpers';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useMemo,
  usePagination,
} from 'hooks/hooks';
import { Column } from 'react-table';
import { uamActions } from 'store/actions';

import styles from './styles.module.scss';

type Props = {
  onCheckboxToggle: (value: number) => void;
  selectedUserIds: number[];
};

const UsersTable: FC<Props> = ({ onCheckboxToggle, selectedUserIds }) => {
  const { users, usersTotalCount } = useAppSelector(
    (state) => state.uamConfigureGroup,
  );
  const dispatch = useAppDispatch();
  const { page, handlePageChange } = usePagination({ queryName: 'users' });
  const columns = useMemo<Column<GroupConfigureUsersTableRow>[]>(() => {
    return getUserColumns({
      name: GroupConfigureFieldsName.USER_IDS,
      onCheckboxToggle,
      selectedUserIds,
    });
  }, [selectedUserIds]);

  useEffect(() => {
    dispatch(
      uamActions.getUsers({
        page: page,
        count: PaginationDefaultValue.DEFAULT_COUNT,
      }),
    );
  }, [page]);

  return (
    <div className={styles.groupWorkers}>
      <p className={styles.groupSubHeading}>
        Add users to the Group - Optional
      </p>
      <Table data={users} columns={columns} />
      <Pagination
        currentPage={page}
        onPageChange={handlePageChange}
        pageSize={PaginationDefaultValue.DEFAULT_COUNT}
        totalCount={usersTotalCount}
      />
      <span className={styles.groupWorkersAmount}>
        {usersTotalCount} results
      </span>
    </div>
  );
};

export { UsersTable };
