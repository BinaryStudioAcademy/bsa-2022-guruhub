import React, { FC, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';

import { Table, Text, View } from '~/components/common/common';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { uamActions } from '~/store/actions';

import { getGroupsColumns, getGroupsRows } from './helpers/helpers';
import { styles } from './styles';

const GroupsTable: FC = () => {
  const dispatch = useAppDispatch();
  const { groups } = useAppSelector((state) => state.uam);

  useEffect(() => {
    dispatch(uamActions.getGroups());
  }, [dispatch]);

  const groupsColumns = getGroupsColumns();
  const groupsRows = getGroupsRows(groups);

  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Groups</Text>
      <Table
        columnWidthArr={[width * 0.2, width * 0.5, width * 0.2]}
        columns={groupsColumns}
        data={groupsRows}
      />
    </View>
  );
};

export { GroupsTable };
