import React, { FC } from 'react';

import {
  AppScreenName,
  DataStatus,
  PaginationDefaultValue,
} from '~/common/enums/enums';
import { GroupsUpdateRequestDto } from '~/common/types/types';
import {
  Button,
  Input,
  ScrollView,
  Spinner,
  Text,
  View,
} from '~/components/common/common';
import {
  PermissionsTable,
  UsersTable,
} from '~/components/uam-configure-group/components/components';
import {
  useAppDispatch,
  useAppForm,
  useAppNavigate,
  useAppSelector,
  useEffect,
  usePagination,
  useSelectedItems,
} from '~/hooks/hooks';
import { groupsCreationActions, uamGroupEditActions } from '~/store/actions';
import { groupCreateClient } from '~/validation-schemas/validation-schemas';

import { CREATE_GROUP_DEFAULT_PAYLOAD } from './common/constants/constants';
import { styles } from './styles';

const UAMConfigureGroup: FC = () => {
  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();

  const { group, dataStatus: groupDataStatus } = useAppSelector(
    (state) => state.uamGroupEdit,
  );

  const { users, permissions, usersDataStatus, permissionsDataStatus } =
    useAppSelector((state) => state.uamGroupCreation);

  const isGroupLoading = groupDataStatus === DataStatus.PENDING;
  const isUsersDataLoading = usersDataStatus === DataStatus.PENDING;
  const isPermissionsDataLoading = permissionsDataStatus === DataStatus.PENDING;

  const { page: usersPage, handlePageChange: handleUserPageChange } =
    usePagination();

  const {
    page: permissionsPage,
    handlePageChange: handlePermissionsPageChange,
  } = usePagination();

  const { control, handleSubmit, errors, reset } =
    useAppForm<GroupsUpdateRequestDto>({
      defaultValues: CREATE_GROUP_DEFAULT_PAYLOAD,
      validationSchema: groupCreateClient,
    });

  const {
    handleToggle: handleTogglePermissions,
    setItems: setDefaultPermissionIds,
  } = useSelectedItems<number>(group?.permissionIds ?? []);

  const { handleToggle: handleToggleUsers, setItems: setDefaultUserIds } =
    useSelectedItems<number>(group?.userIds ?? []);

  const paginationForUsersTable = {
    page: usersPage,
    setPage: handleUserPageChange,
  };

  const paginationForPermissionsTable = {
    page: permissionsPage,
    setPage: handlePermissionsPageChange,
  };

  const handleCreateOrEditGroup = async (
    payload: GroupsUpdateRequestDto,
  ): Promise<void> => {
    if (!group) {
      await dispatch(groupsCreationActions.createGroup(payload)).unwrap();
    } else {
      await dispatch(
        uamGroupEditActions.editGroup({
          id: group.id,
          payload,
        }),
      ).unwrap();
    }
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
      groupsCreationActions.getUsers({
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
      {isGroupLoading && <Spinner isOverflow={true} />}
      <ScrollView style={styles.innerContainer}>
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
          isDataLoading={isUsersDataLoading}
        />
        <Text style={styles.title}>Attach permissions policies</Text>
        <PermissionsTable
          permissions={permissions.items}
          onCheckboxToggle={handleTogglePermissions}
          pagination={paginationForPermissionsTable}
          isDataLoading={isPermissionsDataLoading}
        />
        <View style={styles.buttonsContainer}>
          {group && <Button label="Cancel" onPress={handleCancelEdit} />}
          <Button
            label={`${group ? 'Edit' : 'Create'} group`}
            onPress={handleSubmit(handleCreateOrEditGroup)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export { UAMConfigureGroup };
