import { AppRoute, PaginationDefaultValue } from 'common/enums/enums';
import { FC, GroupsCreateRequestDto } from 'common/types/types';
import { Button, Input } from 'components/common/common';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useEffect,
  useSelectedItems,
} from 'hooks/hooks';
import { groupsCreationActions, uamActions } from 'store/actions';
import { groupCreate } from 'validation-schemas/validation-schemas';

import { DEFAULT_CREATE_GROUP_PAYLOAD } from './common/default-create-group-payload';
import { GroupCreationFieldsName } from './common/enums/enums';
import { PermissionsTable } from './components/permissions-table/permissions-table';
import { UsersTable } from './components/users-table/users-table';
import styles from './styles.module.scss';

const UAMGroupsCreate: FC = () => {
  const dispatch = useAppDispatch();
  const { users, permissions } = useAppSelector((state) => state.groupsCreate);
  const { control, handleSubmit, errors } = useAppForm<GroupsCreateRequestDto>({
    defaultValues: DEFAULT_CREATE_GROUP_PAYLOAD,
    validationSchema: groupCreate,
  });
  const { items: permissionIds, handleToggle: handlePermissionToggle } =
    useSelectedItems<number>([]);
  const { items: userIds, handleToggle: handleUserToggle } =
    useSelectedItems<number>([]);

  const onSubmit = (): void => {
    dispatch(
      groupsCreationActions.createGroup({
        name: control._formValues.name,
        permissionIds,
        userIds,
      }),
    );
  };

  useEffect(() => {
    dispatch(
      uamActions.getUsers({
        page: PaginationDefaultValue.DEFAULT_PAGE,
        count: PaginationDefaultValue.DEFAULT_COUNT,
      }),
    );
    dispatch(groupsCreationActions.getPermissions());
  }, []);

  return (
    <div className={styles.groupCreationMain}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.groupFormHeaderWrapper}>
          <h2 className={styles.groupFormHeading}>Create group</h2>
        </div>
        <Input
          control={control}
          errors={errors}
          label="Group name"
          name={GroupCreationFieldsName.NAME}
          placeholder="Enter group name"
          type="text"
        />
      </form>
      <UsersTable users={users} onCheckboxToggle={handleUserToggle} />
      <PermissionsTable
        permissions={permissions}
        onCheckboxToggle={handlePermissionToggle}
      />
      <div className={styles.btnsBlock}>
        <div className={styles.btnsWrapper}>
          <Button
            type="button"
            btnType="outlined"
            label="Cancel"
            to={AppRoute.UAM}
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            label="Create"
          />
        </div>
      </div>
    </div>
  );
};

export { UAMGroupsCreate };
