import React, { FC } from 'react';

import { AppScreenName } from '~/common/enums/enums';
import { ScrollView } from '~/components/common/common';
import { useAppNavigate } from '~/hooks/hooks';

import { Button } from '../common/common';
import { GroupsTable } from './groups-table/groups-table';
import { UsersTable } from './users-table/users-table';

const UAM: FC = () => {
  const navigate = useAppNavigate();

  const handleOnCreateGroup = (): void => {
    navigate.navigate(AppScreenName.UAM_GROUP_CREATION);
  };

  return (
    <ScrollView>
      <UsersTable />
      <GroupsTable />
      <Button label="Create group" onPress={handleOnCreateGroup} />
    </ScrollView>
  );
};

export { UAM };
