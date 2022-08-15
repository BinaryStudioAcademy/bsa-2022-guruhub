import React, { FC } from 'react';

import { View } from '~/components/common/common';

import { GroupsTable } from './groups-table/groups-table';
import { UsersTable } from './users-table/users-table';

const UAM: FC = () => {
  return (
    <View>
      <UsersTable />
      <GroupsTable />
    </View>
  );
};

export { UAM };
