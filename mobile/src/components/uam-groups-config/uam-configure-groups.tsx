import React, { FC, useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import { AppScreenName, PaginationDefaultValue } from '~/common/enums/enums';
import { GroupsCreateRequestDto } from '~/common/types/types';
import { Button, Input, Text } from '~/components/common/common';
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
import { groupsCreationActions, uamGroupEditActions } from '~/store/actions';
import { getUsers } from '~/store/uam/actions';
import { groupCreateClient } from '~/validation-schemas/validation-schemas';

import { styles } from './styles';

const UAMGroupsConfigure: FC = () => {
  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();

  const { group } = useAppSelector((state) => state.uamGroupEdit);

  const { page: usersPage, handlePageChange: handleUserPageChange } =
    usePagination();

  const {
    page: permissionsPage,
    handlePageChange: handlePermissionsPageChange,
  } = usePagination();

  const { control, handleSubmit, errors } = useAppForm<GroupsCreateRequestDto>({
    defaultValues: { name: group ? group.name : '' },
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

  const handleEditGroup = async (): Promise<void> => {
    group &&
      (await dispatch(
        uamGroupEditActions.editGroup({
          id: group.id,
          payload: {
            name: control._formValues.name,
            permissionIds,
            userIds,
          },
        }),
      ).unwrap());
    navigation.navigate(AppScreenName.UAM);
  };

  const handleCancelEdit = async (): Promise<void> => {
    dispatch(uamGroupEditActions.cancelEdit);
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

        <Text style={styles.title}>Add users to the Group - Optional</Text>
        <UsersTable
          users={users}
          onCheckbox={handleToggleUsers}
          pagination={paginationForUsersTable}
          checkedUsersIds={group ? group.userIds : []}
        />
        <Text style={styles.title}>Attach permissions policies</Text>
        <PermissionsTable
          permissions={permissions.items}
          onCheckbox={handleTogglePermissions}
          pagination={paginationForPermissionsTable}
          checkedPermissionsIds={group ? group.permissionIds : []}
        />
        <View style={styles.buttonsContainer}>
          {group && (
            <Button label="Cancel" onPress={handleSubmit(handleCancelEdit)} />
          )}
          <Button
            label="Create group"
            onPress={handleSubmit(group ? handleEditGroup : handleCreateGroup)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export { UAMGroupsConfigure };
