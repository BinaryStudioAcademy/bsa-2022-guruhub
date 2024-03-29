import { AppRoute, PaginationDefaultValue } from 'common/enums/enums';
import { FC, GroupsConfigureRequestDto } from 'common/types/types';
import { Button, Input } from 'components/common/common';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useEffect,
  usePagination,
  useParams,
  useSelectedItems,
} from 'hooks/hooks';
import { uamConfigureGroupActions } from 'store/actions';
import { groupConfigureClient as groupConfigureClientSchema } from 'validation-schemas/validation-schemas';

import { DEFAULT_CONFIGURE_GROUP_PAYLOAD } from './common/default-configure-group-payload';
import { GroupConfigureFieldsName } from './common/enums/enums';
import { PermissionsTable } from './components/permissions-table/permissions-table';
import { UsersTable } from './components/users-table/users-table';
import styles from './styles.module.scss';

const UAMConfigureGroup: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { permissions, group, users, permissionsTotalCount } = useAppSelector(
    (state) => state.uamConfigureGroup,
  );
  const { control, handleSubmit, errors, reset } =
    useAppForm<GroupsConfigureRequestDto>({
      defaultValues: DEFAULT_CONFIGURE_GROUP_PAYLOAD,
      validationSchema: groupConfigureClientSchema,
    });
  const {
    items: permissionIds,
    handleToggle: handlePermissionToggle,
    setItems: setDefaultPermissionIds,
  } = useSelectedItems<number>([]);
  const {
    items: userIds,
    handleToggle: handleUserToggle,
    setItems: setDefaultUserIds,
  } = useSelectedItems<number>([]);
  const { page: usersPage, handlePageChange: handleUsersPageChange } =
    usePagination({ queryName: 'users' });
  const {
    page: permissionsPage,
    handlePageChange: handlePermissionsPageChange,
  } = usePagination({ queryName: 'permissions' });
  const handleCreateOrEdit = (values: GroupsConfigureRequestDto): void => {
    const { name } = values;

    if (!isEdit) {
      dispatch(
        uamConfigureGroupActions.createGroup({
          name,
          permissionIds,
          userIds,
        }),
      );

      return;
    }

    dispatch(
      uamConfigureGroupActions.updateGroup({
        id: Number(id),
        payload: {
          name,
          permissionIds,
          userIds,
        },
      }),
    );
  };

  useEffect(() => {
    dispatch(
      uamConfigureGroupActions.getPermissions({
        page: permissionsPage,
        count: PaginationDefaultValue.DEFAULT_COUNT,
      }),
    );
  }, [permissionsPage]);

  useEffect(() => {
    if (isEdit) {
      dispatch(uamConfigureGroupActions.getGroupById({ id: Number(id) }));
    }
  }, []);

  useEffect(() => {
    dispatch(
      uamConfigureGroupActions.getUsers({
        page: usersPage,
        count: PaginationDefaultValue.DEFAULT_COUNT,
      }),
    );
  }, [usersPage]);

  useEffect(() => {
    if (group && isEdit) {
      setDefaultPermissionIds(group.permissionIds);
      setDefaultUserIds(group.userIds);
      reset({ name: group.name });
    }
  }, [group]);

  return (
    <div className={styles.groupCreationMain}>
      <form onSubmit={handleSubmit(handleCreateOrEdit)}>
        <div className={styles.groupFormHeaderWrapper}>
          <h2 className={styles.groupFormHeading}>
            {isEdit ? 'Edit' : 'Create'} group
          </h2>
        </div>
        <Input
          control={control}
          errors={errors}
          label="Group name"
          name={GroupConfigureFieldsName.NAME}
          placeholder="Enter group name"
          type="text"
          inputClassName={styles.nameField}
        />
      </form>
      <UsersTable
        users={users}
        onCheckboxToggle={handleUserToggle}
        selectedUserIds={userIds}
        page={usersPage}
        onPageChange={handleUsersPageChange}
      />
      <PermissionsTable
        permissions={permissions}
        onCheckboxToggle={handlePermissionToggle}
        selectedPermissionIds={permissionIds}
        page={permissionsPage}
        onPageChange={handlePermissionsPageChange}
        permissionsTotalCount={permissionsTotalCount}
      />
      <div className={styles.btnsBlock}>
        <div className={styles.btnsWrapper}>
          <Button
            type="button"
            btnColor="gray"
            btnType="filled"
            label="Cancel"
            to={AppRoute.UAM}
          />
          <Button
            onClick={handleSubmit(handleCreateOrEdit)}
            type="submit"
            label={isEdit ? 'Edit' : 'Create'}
            btnColor="blue"
          />
        </div>
      </div>
    </div>
  );
};

export { UAMConfigureGroup };
