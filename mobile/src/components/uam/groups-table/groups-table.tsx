import React, { FC } from 'react';

import { AppScreenName, PaginationDefaultValue } from '~/common/enums/enums';
import { Pagination, Table, Text, View } from '~/components/common/common';
import { getFormattedDate } from '~/helpers/helpers';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useCallback,
  useFocusEffect,
  usePagination,
} from '~/hooks/hooks';
import { uamActions, uamGroupEditActions } from '~/store/actions';

import { ActionCell } from './components/components';
import { getGroupsColumns } from './helpers/helpers';
import { styles } from './styles';

const GroupsTable: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigate();

  const { groups, groupsTotalCount } = useAppSelector((state) => state.uam);

  const { page, handlePageChange } = usePagination();

  const handleGroupsItemDelete = (groupId: number): void => {
    dispatch(uamActions.deleteGroup({ id: groupId }));
  };

  const handleGroupsItemEdit = async (groupId: number): Promise<void> => {
    await dispatch(uamGroupEditActions.getGroupById({ id: groupId }));
    navigation.navigate(AppScreenName.UAM_GROUPS_EDIT);
  };

  const groupsColumns = getGroupsColumns();
  const groupsRows = groups.map((group) => ({
    ...group,
    createdAt: getFormattedDate(group.createdAt, 'kk:mm, dd/MM/yyyy'),
    action: (
      <ActionCell
        id={group.id}
        onDelete={handleGroupsItemDelete}
        onEdit={handleGroupsItemEdit}
      />
    ),
  }));

  useFocusEffect(
    useCallback(() => {
      dispatch(
        uamActions.getGroups({
          page,
          count: PaginationDefaultValue.DEFAULT_COUNT,
        }),
      );
    }, [page, groupsTotalCount]),
  );

  return (
    <View style={styles.tableContainer}>
      <Text style={styles.tableTitle}>Groups</Text>
      <View style={styles.tableWrapper}>
        <Table
          columnWidthArr={[50, 180, 180, 155, 100]}
          columns={groupsColumns}
          data={groupsRows}
        />
      </View>
      {Boolean(groupsTotalCount) && (
        <Pagination
          totalCount={groupsTotalCount}
          pageSize={PaginationDefaultValue.DEFAULT_COUNT}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
    </View>
  );
};

export { GroupsTable };
