import { AppRoute } from 'common/enums/enums';
import { FC, GroupsCreateRequestDto } from 'common/types/types';
import { Button, Input } from 'components/common/common';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useEffect,
  useParams,
  useSelectedItems,
} from 'hooks/hooks';
import { configurateGroupActions } from 'store/actions';
import { groupCreateClient } from 'validation-schemas/validation-schemas';

import { DEFAULT_CONFIGURATE_GROUP_PAYLOAD } from './common/default-configurate-group-payload';
import { GroupConfigurateFieldsName } from './common/enums/enums';
import { PermissionsTable } from './components/permissions-table/permissions-table';
import { UsersTable } from './components/users-table/users-table';
import styles from './styles.module.scss';

type Props = {
  mode: 'create' | 'edit';
  name: 'Create' | 'Edit';
};

const UAMConfigurateGroup: FC<Props> = ({ mode, name }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { permissions, group } = useAppSelector(
    (state) => state.configurateGroup,
  );
  const { control, handleSubmit, errors, reset } =
    useAppForm<GroupsCreateRequestDto>({
      defaultValues: DEFAULT_CONFIGURATE_GROUP_PAYLOAD,
      validationSchema: groupCreateClient,
    });
  const {
    items: permissionIds,
    handleToggle: handlePermissionToggle,
    setItems: setDefaultPermissionIds,
  } = useSelectedItems<number>(group?.permissionIds ?? []);
  const {
    items: userIds,
    handleToggle: handleUserToggle,
    setItems: setDefaultUserIds,
  } = useSelectedItems<number>(group?.userIds ?? []);

  const onSubmit = (): void => {
    if (mode === 'create') {
      dispatch(
        configurateGroupActions.createGroup({
          name: control._formValues.name,
          permissionIds,
          userIds,
        }),
      );
    } else {
      dispatch(
        configurateGroupActions.updateGroup({
          id: Number(id),
          payload: {
            name: control._formValues.name,
            permissionIds,
            userIds,
          },
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(configurateGroupActions.getPermissions());

    if (mode === 'edit') {
      dispatch(configurateGroupActions.getGroupById({ id: Number(id) }));
    }
  }, []);

  useEffect(() => {
    if (group) {
      setDefaultPermissionIds(group.permissionIds);
      setDefaultUserIds(group.userIds);
      reset({ name: group.name });
    }
  }, [group]);

  return (
    <div className={styles.groupCreationMain}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.groupFormHeaderWrapper}>
          <h2 className={styles.groupFormHeading}>{name} group</h2>
        </div>
        <Input
          control={control}
          errors={errors}
          label="Group name"
          name={GroupConfigurateFieldsName.NAME}
          placeholder="Enter group name"
          type="text"
        />
      </form>
      <UsersTable
        onCheckboxToggle={handleUserToggle}
        defaultSelectedUserIds={userIds}
      />
      <PermissionsTable
        permissions={permissions}
        onCheckboxToggle={handlePermissionToggle}
        defaultSelectedPermissionIds={permissionIds}
      />
      <div className={styles.btnsBlock}>
        <div className={styles.btnsWrapper}>
          <Button
            type="button"
            btnType="outlined"
            label="Cancel"
            to={AppRoute.UAM}
          />
          <Button onClick={handleSubmit(onSubmit)} type="submit" label={name} />
        </div>
      </div>
    </div>
  );
};

export { UAMConfigurateGroup };
