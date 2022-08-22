import React, { FC } from 'react';

import { AppScreenName, PaginationDefaultValue } from '~/common/enums/enums';
import { Pagination, Table, Text, View } from '~/components/common/common';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useCallback,
  useFocusEffect,
  usePagination,
} from '~/hooks/hooks';
import { uamActions, uamGroupEditActions } from '~/store/actions';

import { styles } from '../styles';
import { ActionCell } from './components/components';
import { getGroupsColumns } from './helpers/helpers';

const GroupsTable: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigate();

  const { groups } = useAppSelector((state) => state.uam);
  const { items, total } = groups;
  const { page, handlePageChange } = usePagination();
  const handleGroupsItemDelete = (groupId: number): void => {
    dispatch(uamActions.deleteGroup({ id: groupId }));
  };

  const handleGroupsItemEdit = (groupId: number): void => {
    dispatch(uamGroupEditActions.getGroupById({ id: groupId }));
    navigation.navigate(AppScreenName.UAM_GROUPS_EDIT);
  };

  const groupsColumns = getGroupsColumns();
  const groupsRows = items.map((group) => ({
    ...group,
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
    }, [page]),
  );

  return (
    <View style={styles.tableContainer}>
      <Text style={styles.tableTitle}>Groups</Text>
      <View>
        <Table
          columnWidthArr={[50, 180, 180, 100]}
          columns={groupsColumns}
          data={groupsRows}
        />
      </View>
      {total > 0 && (
        <Pagination
          totalCount={total}
          pageSize={PaginationDefaultValue.DEFAULT_COUNT}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
    </View>
  );
};

export { GroupsTable };
