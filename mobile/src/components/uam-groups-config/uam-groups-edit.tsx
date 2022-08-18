import React, { FC, useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import { AppScreenName, PaginationDefaultValue } from '~/common/enums/enums';
import { GroupsUpdateRequestDto } from '~/common/types/types';
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
import { groupsCreationActions, uamGroupEditActions } from '~/store/actions';
import { getUsers } from '~/store/uam/actions';
import { groupUpdateParams } from '~/validation-schemas/validation-schemas';

import { styles } from './styles';

const UAMGroupsEdit: FC = () => {
  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();

  const { page: usersPage, handlePageChange: handleUserPageChange } =
    usePagination();

  const {
    page: permissionsPage,
    handlePageChange: handlePermissionsPageChange,
  } = usePagination();

  const { control, handleSubmit, errors } = useAppForm<GroupsUpdateRequestDto>({
    defaultValues: CREATE_GROUP_DEFAULT_PAYLOAD,
    validationSchema: groupUpdateParams,
  });

  const { users, permissions } = useAppSelector(
    (state) => state.uamGroupCreation,
  );

  const { group } = useAppSelector((state) => state.uamGroupEdit);

  const { items: permissionIds, handleToggle: handleTogglePermissions } =
    useSelectedItems<number>(group?.permissionIds as number[]);

  const { items: userIds, handleToggle: handleToggleUsers } =
    useSelectedItems<number>(group?.userIds as number[]);

  const paginationForUsersTable = {
    page: usersPage,
    setPage: handleUserPageChange,
  };

  const paginationForPermissionsTable = {
    page: permissionsPage,
    setPage: handlePermissionsPageChange,
  };

  const handleEditGroup = async (): Promise<void> => {
    await dispatch(
      uamGroupEditActions.editGroup({
        id: group?.id as number,
        payload: {
          name: control._formValues.name,
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
            placeholder={group?.name}
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
          <Button label="Cancel" onPress={handleSubmit(handleCancelEdit)} />
          <Button label="Edit" onPress={handleSubmit(handleEditGroup)} />
        </View>
      </ScrollView>
    </View>
  );
};

export { UAMGroupsEdit };
