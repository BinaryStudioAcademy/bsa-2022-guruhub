import React, { FC } from 'react';

import { ScrollView } from '~/components/common/common';

import { GroupsTable } from './groups-table/groups-table';
import { UsersTable } from './users-table/users-table';

const UAM: FC = () => {
  return (
    <ScrollView>
      <UsersTable />
      <GroupsTable />
    </ScrollView>
  );
};

export { UAM };
