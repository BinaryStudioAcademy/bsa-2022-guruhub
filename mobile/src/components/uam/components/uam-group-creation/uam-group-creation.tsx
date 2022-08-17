import React, { FC, useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import { AppScreenName, PaginationDefaultValue } from '~/common/enums/enums';
import { GroupsCreateRequestDto } from '~/common/types/types';
import { Button, Input, Text } from '~/components/common/common';
import { CREATE_GROUP_DEFAULT_PAYLOAD } from '~/components/uam/components/uam-group-creation/common/types/types';
import {
  GroupCreationPermissionsTable,
  GroupCreationUsersTable,
} from '~/components/uam/components/uam-group-creation/components/conponents';
import {
  useAppDispatch,
  useAppForm,
  useAppNavigate,
  useAppSelector,
  usePagination,
  useSelectedItems,
} from '~/hooks/hooks';
import { getUsers } from '~/store/uam/actions';
import { createGroup, getPermissions } from '~/store/uam-groups-create/actions';
import { groupCreateClient } from '~/validation-schemas/validation-schemas';

import { styles } from './styles';

const UamGroupCreation: FC = () => {
  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();
  const { page: usersPage, handlePageChange } = usePagination();
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
    setPage: handlePageChange,
  };

  const { users, permissions } = useAppSelector(
    (state) => state.uamGroupCreation,
  );

  const handleCreateGroup = (): void => {
    dispatch(
      createGroup({
        name: control._formValues.name,
        permissionIds,
        userIds,
      }),
    );
    navigation.navigate(AppScreenName.UAM);
  };

  const handleGetUsers = (page: number): void => {
    dispatch(
      getUsers({
        page: page,
        count: PaginationDefaultValue.DEFAULT_COUNT,
      }),
    );
  };

  useEffect(() => {
    handleGetUsers(usersPage);
    dispatch(getPermissions());
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
        <GroupCreationUsersTable
          users={users}
          onCheckbox={handleToggleUsers}
          pagination={paginationForUsersTable}
        />
        <Text style={styles.title}>Attach permissions policies</Text>
        <GroupCreationPermissionsTable
          permissions={permissions}
          onCheckbox={handleTogglePermissions}
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

export { UamGroupCreation };
