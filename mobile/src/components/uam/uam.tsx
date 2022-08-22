import React, { FC } from 'react';

import { AppScreenName, DataStatus } from '~/common/enums/enums';
import { ScrollView, Spinner, View } from '~/components/common/common';
import { useAppNavigate, useAppSelector } from '~/hooks/hooks';

import { Button } from '../common/common';
import { GroupsTable } from './groups-table/groups-table';
import { styles } from './styles';
import { UsersTable } from './users-table/users-table';

const UAM: FC = () => {
  const navigate = useAppNavigate();
  const { groupsDataStatus, usersDataStatus } = useAppSelector(
    (state) => state.uam,
  );

  const areUsersLoading = usersDataStatus === DataStatus.PENDING;
  const areGroupsLoading = groupsDataStatus === DataStatus.PENDING;

  const handleGroupCreate = (): void => {
    navigate.navigate(AppScreenName.UAM_GROUPS_CREATE);
  };

  return (
    <>
      {areUsersLoading && areGroupsLoading && <Spinner isOverflow />}
      <ScrollView>
        <View style={styles.container}>
          <UsersTable />
          <GroupsTable />
          <View style={styles.buttonWrapper}>
            <Button label="Create group" onPress={handleGroupCreate} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export { UAM };
