import React, { FC, useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import { AppScreenName, PaginationDefaultValue } from '~/common/enums/enums';
import { GroupsCreateRequestDto } from '~/common/types/types';
import { Button, Input, Text } from '~/components/common/common';
import { CREATE_GROUP_DEFAULT_PAYLOAD } from '~/components/uam-groups-config/common/constants/constants';
import {
  PermissionsTable,
  UsersTable,
} from '~/components/uam-groups-config/components/components';
import {
  useAppDispatch,
  useAppForm,
  useAppNavigate,
  useAppSelector,
  usePagination,
  useSelectedItems,
} from '~/hooks/hooks';
import { groupsCreationActions } from '~/store/actions';
import { getUsers } from '~/store/uam/actions';
import { groupCreateClient } from '~/validation-schemas/validation-schemas';

import { styles } from './styles';

const UAMGroupsCreate: FC = () => {
  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();
  const { page: usersPage, handlePageChange: handleUserPageChange } =
    usePagination();
  const {
    page: permissionsPage,
    handlePageChange: handlePermissionsPageChange,
  } = usePagination();
  const { control, handleSubmit, errors } = useAppForm<GroupsCreateRequestDto>({
    defaultValues: CREATE_GROUP_DEFAULT_PAYLOAD,
    validationSchema: groupCreateClient,
  });

  const { items: permissionIds, handleToggle: handleTogglePermissions } =
    useSelectedItems<number>([]);

  const { items: userIds, handleToggle: handleToggleUsers } =
    useSelectedItems<number>([]);

  const paginationForUsersTable = {
    page: usersPage,
    setPage: handleUserPageChange,
  };

  const paginationForPermissionsTable = {
    page: permissionsPage,
    setPage: handlePermissionsPageChange,
  };

  const { users, permissions } = useAppSelector(
    (state) => state.uamGroupCreation,
  );

  const handleCreateGroup = async (): Promise<void> => {
    await dispatch(
      groupsCreationActions.createGroup({
        name: control._formValues.name,
        permissionIds,
        userIds,
      }),
    ).unwrap();
    navigation.navigate(AppScreenName.UAM);
  };

  useEffect(() => {
    dispatch(
      getUsers({
        page: usersPage,
        count: PaginationDefaultValue.DEFAULT_COUNT,
      }),
    );
    dispatch(groupsCreationActions.getPermissions());
  }, [usersPage]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <Input
            name="name"
            placeholder="Enter group name"
            label="Group name"
            control={control}
            errors={errors}
          />
        </View>

        <Text style={styles.title}>Add workers to the Group - Optional</Text>
        <UsersTable
          users={users}
          onCheckbox={handleToggleUsers}
          pagination={paginationForUsersTable}
        />
        <Text style={styles.title}>Attach permissions policies</Text>
        <PermissionsTable
          permissions={permissions.items}
          onCheckbox={handleTogglePermissions}
          pagination={paginationForPermissionsTable}
        />
        <View style={styles.buttonsContainer}>
          <Button
            label="Create group"
            onPress={handleSubmit(handleCreateGroup)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export { UAMGroupsCreate };
