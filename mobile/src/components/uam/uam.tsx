import React, { FC } from 'react';

import { View } from '~/components/common/common';

import { GroupsTable } from './groups-table/groups-table';

const UAM: FC = () => {
  return (
    <View>
      <GroupsTable />
    </View>
  );
};

export { UAM };
