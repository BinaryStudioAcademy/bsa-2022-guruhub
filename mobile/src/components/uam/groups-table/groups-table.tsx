import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';

import { Table, Text, View } from '~/components/common/common';
import { useAppDispatch, useAppSelector, useEffect } from '~/hooks/hooks';
import { uamActions } from '~/store/actions';

import { ActionCell } from './components/components';
import { getGroupsColumns } from './helpers/helpers';
import { styles } from './styles';

const GroupsTable: FC = () => {
  const dispatch = useAppDispatch();
  const { width } = useWindowDimensions();
  const { items } = useAppSelector((state) => state.uam.groups);

  const handleGroupsItemDelete = (groupId: number): void => {
    dispatch(uamActions.deleteGroup({ id: groupId }));
  };

  const groupsColumns = getGroupsColumns();
  const groupsRows = items.map((group) => ({
    ...group,
    action: <ActionCell id={group.id} onDelete={handleGroupsItemDelete} />,
  }));

  useEffect(() => {
    dispatch(uamActions.getGroups());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Groups</Text>
      <Table
        columnWidthArr={[width * 0.15, width * 0.35, width * 0.2, width * 0.2]}
        columns={groupsColumns}
        data={groupsRows}
      />
    </View>
  );
};

export { GroupsTable };
