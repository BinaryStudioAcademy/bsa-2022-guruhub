import React, { FC } from 'react';

import {
  DataStatus,
  PaginationDefaultValue,
  UAMScreenName,
} from '~/common/enums/enums';
import { GroupsUpdateRequestDto } from '~/common/types/types';
import {
  BackButton,
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
  useAppRoute,
  useAppSelector,
  useCallback,
  useEffect,
  useFocusEffect,
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
  const { name } = useAppRoute();

  const { group, dataStatus: groupDataStatus } = useAppSelector(
    (state) => state.uamGroupEdit,
  );

  const { users, permissions } = useAppSelector(
    (state) => state.uamGroupCreation,
  );

  const isGroupEdit = name === UAMScreenName.UAM_GROUPS_EDIT && group;
  const isGroupLoading = groupDataStatus === DataStatus.PENDING;

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

  const handleCreateOrEditGroup = async (
    payload: GroupsUpdateRequestDto,
  ): Promise<void> => {
    const { name } = payload;

    if (!isGroupEdit) {
      await dispatch(
        groupsCreationActions.createGroup({
          name,
          permissionIds,
          userIds,
        }),
      ).unwrap();
    } else if (isGroupEdit) {
      await dispatch(
        uamGroupEditActions.editGroup({
          id: group.id,
          payload: {
            name,
            permissionIds,
            userIds,
          },
        }),
      ).unwrap();
    }
    navigation.navigate(UAMScreenName.UAM);
  };

  const handleBack = async (): Promise<void> => {
    if (group) {
      dispatch(uamGroupEditActions.cancelEdit);
    }
    navigation.navigate(UAMScreenName.UAM);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => <BackButton onPress={handleBack} />,
    });
    navigation.getParent()?.setOptions({
      headerShown: false,
    });
  }, []);

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
    if (isGroupEdit) {
      setDefaultPermissionIds(group.permissionIds);
      setDefaultUserIds(group.userIds);
      reset({ name: group.name });
    }
  }, [isGroupEdit]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        reset(CREATE_GROUP_DEFAULT_PAYLOAD);
        handleUserPageChange(PaginationDefaultValue.DEFAULT_PAGE);
        handlePermissionsPageChange(PaginationDefaultValue.DEFAULT_PAGE);
        setDefaultPermissionIds([]);
        setDefaultUserIds([]);
      };
    }, []),
  );

  if (isGroupLoading) {
    return <Spinner isOverflow />;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
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
          checkedIds={userIds}
        />
        <Text style={styles.title}>Attach permissions policies</Text>
        <PermissionsTable
          permissions={permissions.items}
          onCheckboxToggle={handleTogglePermissions}
          pagination={paginationForPermissionsTable}
          checkedIds={permissionIds}
        />
        <View style={styles.buttonsContainer}>
          <Button
            label={`${isGroupEdit ? 'Edit' : 'Create'} group`}
            onPress={handleSubmit(handleCreateOrEditGroup)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export { UAMConfigureGroup };
