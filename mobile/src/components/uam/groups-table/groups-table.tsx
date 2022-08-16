import React, { FC } from 'react';

import { useWindowDimensions } from 'react-native';

import { PaginationDefaultValue } from '~/common/enums/enums';
import { Pagination, Table, Text, View } from '~/components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from '~/hooks/hooks';
import { uamActions } from '~/store/actions';

import { ActionCell } from './components/components';
import { getGroupsColumns } from './helpers/helpers';
import { styles } from './styles';

const GroupsTable: FC = () => {
  const dispatch = useAppDispatch();
  const { width } = useWindowDimensions();
  const { items, total } = useAppSelector((state) => state.uam.groups);
  const [page, setPage] = useState<number>(PaginationDefaultValue.DEFAULT_PAGE);

  const handleGroupsItemDelete = (groupId: number): void => {
    dispatch(uamActions.deleteGroup({ id: groupId }));
  };

  const groupsColumns = getGroupsColumns();
  const groupsRows = items.map((group) => ({
    ...group,
    action: <ActionCell id={group.id} onDelete={handleGroupsItemDelete} />,
  }));

  useEffect(() => {
    dispatch(
      uamActions.getGroups({
        page,
        count: PaginationDefaultValue.DEFAULT_COUNT,
      }),
    );
  }, [page]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Groups</Text>
      <Table
        columnWidthArr={[width * 0.15, width * 0.35, width * 0.2, width * 0.2]}
        columns={groupsColumns}
        data={groupsRows}
      />
      {total > 0 && (
        <Pagination
          totalCount={total}
          pageSize={PaginationDefaultValue.DEFAULT_COUNT}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </View>
  );
};

export { GroupsTable };
