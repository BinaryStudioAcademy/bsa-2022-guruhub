import { AppRoute, PaginationDefaultValue } from 'common/enums/enums';
import { FC, GroupsItemResponseDto } from 'common/types/types';
import { Button, Pagination, Table } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useMemo,
  usePagination,
} from 'hooks/hooks';
import { Column } from 'react-table';
import { uamActions } from 'store/actions';

import { getGroupsColumns, getGroupsRows } from './helpers/helpers';
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
  }, [page]);

  const handleGroupDelete = (groupId: number): void => {
    dispatch(uamActions.deleteGroup({ id: groupId }));
  };

  const columns = useMemo<Column<GroupsItemResponseDto>[]>(() => {
    return getGroupsColumns(handleGroupDelete);
  }, []);

  const data: GroupsItemResponseDto[] = getGroupsRows(groups);

  return (
    <div className={styles.groupsTable}>
      <div className={styles.groupTableHeadingPanel}>
        <h1 className={styles.groupsTableHeading}>Groups</h1>
        <Button
          label="Add Group"
          btnColor="blue"
          type="button"
          to={AppRoute.UAM_CONFIGURE_GROUP}
        />
      </div>
      <Table data={data} columns={columns} />
      <div className={styles.tableFooterSection}>
        <p className={styles.results}>{groupsTotalCount} results</p>
        <Pagination
          currentPage={page}
          onPageChange={handlePageChange}
          pageSize={PaginationDefaultValue.DEFAULT_COUNT}
          totalCount={groupsTotalCount}
        />
      </div>
    </div>
  );
};

export { GroupsTable };
