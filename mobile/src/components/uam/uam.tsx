import React, { FC } from 'react';

import { AppScreenName } from '~/common/enums/enums';
import { ScrollView } from '~/components/common/common';
import { useAppNavigate } from '~/hooks/hooks';

import { Button } from '../common/common';
import { GroupsTable } from './groups-table/groups-table';
import { UsersTable } from './users-table/users-table';

const UAM: FC = () => {
  const navigate = useAppNavigate();

  const handleGroupCreate = (): void => {
    navigate.navigate(AppScreenName.UAM_GROUPS_CREATE);
  };

  return (
    <ScrollView>
      <UsersTable />
      <GroupsTable />
      <Button label="Create group" onPress={handleGroupCreate} />
    </ScrollView>
  );
};

export { UAM };
