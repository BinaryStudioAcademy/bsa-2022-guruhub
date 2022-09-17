import { AppRoute, PaginationDefaultValue } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Button, Table } from 'components/common/common';
import { GroupsTableRow } from 'components/uam/common/types/types';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useMemo,
  usePagination,
} from 'hooks/hooks';
import { Column } from 'react-table';
import { uamActions } from 'store/actions';

import { getGroupsColumns, getGroupTableData } from './helpers/helpers';
import styles from './styles.module.scss';

const GroupsTable: FC = () => {
  const { page, handlePageChange } = usePagination({ queryName: 'groupsPage' });
  const dispatch = useAppDispatch();
  const { groups, groupsTotalCount } = useAppSelector((state) => state.uam);

  useEffect(() => {
    dispatch(
      uamActions.getGroups({
        page,
        count: PaginationDefaultValue.DEFAULT_COUNT,
      }),
    );
  }, [page, groupsTotalCount]);

  const handleGroupDelete = (groupId: number): void => {
    dispatch(uamActions.deleteGroup({ id: groupId }));
  };

  const columns = useMemo<Column<GroupsTableRow>[]>(() => {
    return getGroupsColumns(handleGroupDelete);
  }, []);

  const groupsData = useMemo<GroupsTableRow[]>(() => {
    return getGroupTableData(groups);
  }, [groups]);

  return (
    <div className={styles.groupsTable}>
      <div className={styles.groupTableHeadingPanel}>
        <h1 className={styles.groupsTableHeading}>Groups</h1>
        <div className={styles.buttonWrapper}>
          <Button
            label="Create Group"
            btnColor="blue"
            type="button"
            to={AppRoute.UAM_CONFIGURE_GROUP}
          />
        </div>
      </div>
      <Table
        data={groupsData}
        columns={columns}
        currentPage={page}
        onPageChange={handlePageChange}
        pageSize={PaginationDefaultValue.DEFAULT_COUNT}
        totalCount={groupsTotalCount}
      />
    </div>
  );
};

export { GroupsTable };
