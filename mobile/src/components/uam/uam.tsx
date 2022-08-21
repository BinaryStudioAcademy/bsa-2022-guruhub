import React, { FC, useEffect } from 'react';

import { AppScreenName } from '~/common/enums/enums';
import { ScrollView, View } from '~/components/common/common';
import { useAppDispatch, useAppNavigate } from '~/hooks/hooks';
import { authActions } from '~/store/actions';

import { Button } from '../common/common';
import { GroupsTable } from './groups-table/groups-table';
import { styles } from './styles';
import { UsersTable } from './users-table/users-table';

const UAM: FC = () => {
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();

  const handleGroupCreate = (): void => {
    navigate.navigate(AppScreenName.UAM_GROUPS_CREATE);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(authActions.loadCurrentUser());
    }, 2000);

    return () => clearInterval(timer);
  }, [dispatch]);

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
