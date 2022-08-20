import React, { FC } from 'react';

import { AppScreenName } from '~/common/enums/enums';
import { ScrollView, View } from '~/components/common/common';
import { useAppNavigate } from '~/hooks/hooks';

import { Button } from '../common/common';
import { GroupsTable } from './groups-table/groups-table';
import { styles } from './styles';
import { UsersTable } from './users-table/users-table';

const UAM: FC = () => {
  const navigate = useAppNavigate();

  const handleGroupCreate = (): void => {
    navigate.navigate(AppScreenName.UAM_GROUPS_CREATE);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <UsersTable />
        <GroupsTable />
        <Button label="Create group" onPress={handleGroupCreate} />
      </View>
    </ScrollView>
  );
};

export { UAM };
