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
import { groupCreateClient } from '~/validation-schemas/validation-schemas';

import { CREATE_GROUP_DEFAULT_PAYLOAD } from './common/constants/create-group-default.constants';
import { styles } from './styles';

const UAMConfigureGroup: FC = () => {
  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();

  const { group } = useAppSelector((state) => state.uamGroupEdit);

  const { users, permissions } = useAppSelector(
    (state) => state.uamGroupCreation,
  );

  const { page: usersPage, handlePageChange: handleUserPageChange } =
    usePagination();

  const {
    page: permissionsPage,
    handlePageChange: handlePermissionsPageChange,
  } = usePagination();

  const { control, handleSubmit, errors, reset } =
    useAppForm<GroupsCreateRequestDto>({
      defaultValues: CREATE_GROUP_DEFAULT_PAYLOAD,
      validationSchema: groupCreateClient,
    });

  const {
    items: permissionIds,
    handleToggle: handleTogglePermissions,
    setItems: setDefaultPermissionIds,
  } = useSelectedItems<number>(group?.permissionIds ?? []);

  const {
    items: userIds,
    handleToggle: handleToggleUsers,
    setItems: setDefaultUserIds,
  } = useSelectedItems<number>(group?.userIds ?? []);

  const paginationForUsersTable = {
    page: usersPage,
    setPage: handleUserPageChange,
  };

  const paginationForPermissionsTable = {
    page: permissionsPage,
    setPage: handlePermissionsPageChange,
  };

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
    if (!group) {
      return;
    }

    const groupName = control._formValues.name;

    await dispatch(
      uamGroupEditActions.editGroup({
        id: group.id,
        payload: {
          name: groupName,
          permissionIds,
          userIds,
        },
      }),
    ).unwrap();
    navigation.navigate(AppScreenName.UAM);
  };

  const handleCancelEdit = async (): Promise<void> => {
    dispatch(uamGroupEditActions.cancelEdit);
    navigation.navigate(AppScreenName.UAM);
  };

  useEffect(() => {
    dispatch(groupsCreationActions.getPermissions());
  }, []);

  useEffect(() => {
    dispatch(
      groupsCreationActions.getUsersForCreation({
        page: usersPage,
        count: PaginationDefaultValue.DEFAULT_COUNT,
      }),
    );
  }, [usersPage]);

  useEffect(() => {
    if (group) {
      setDefaultPermissionIds(group.permissionIds);
      setDefaultUserIds(group.userIds);
      reset({ name: group.name });
    }
  }, [group]);

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
          onCheckboxToggle={handleToggleUsers}
          pagination={paginationForUsersTable}
        />
        <Text style={styles.title}>Attach permissions policies</Text>
        <PermissionsTable
          permissions={permissions.items}
          onCheckboxToggle={handleTogglePermissions}
          pagination={paginationForPermissionsTable}
        />
        <View style={styles.buttonsContainer}>
          {group && <Button label="Cancel" onPress={handleCancelEdit} />}
          <Button
            label={`${group ? 'Edit' : 'Create'} group`}
            onPress={handleSubmit(group ? handleEditGroup : handleCreateGroup)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export { UAMConfigureGroup };
