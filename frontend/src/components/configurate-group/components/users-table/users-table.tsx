import { PaginationDefaultValue } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Pagination, Table } from 'components/common/common';
import { GroupConfigurateFieldsName } from 'components/configurate-group/common/enums/enums';
import { GroupConfigurateUsersTableRow } from 'components/configurate-group/common/types/types';
import { getUserColumns } from 'components/configurate-group/helpers/helpers';
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
  defaultSelectedUserIds?: number[];
};

const UsersTable: FC<Props> = ({
  onCheckboxToggle,
  defaultSelectedUserIds = [],
}) => {
  const { users, usersTotalCount } = useAppSelector(
    (state) => state.configurateGroup,
  );
  const dispatch = useAppDispatch();
  const { page, handlePageChange } = usePagination({ queryName: 'users' });
  const columns = useMemo<Column<GroupConfigurateUsersTableRow>[]>(() => {
    return getUserColumns({
      name: GroupConfigurateFieldsName.USER_IDS,
      onCheckboxToggle,
      defaultSelectedUserIds,
    });
  }, [defaultSelectedUserIds]);

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
