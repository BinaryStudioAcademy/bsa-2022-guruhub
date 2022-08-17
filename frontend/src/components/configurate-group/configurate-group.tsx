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

const UAMConfigurateGroup: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isEdit = Boolean(id);
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
    if (!isEdit) {
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

    if (isEdit) {
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
          <h2 className={styles.groupFormHeading}>
            {isEdit ? 'Edit' : 'Create'} group
          </h2>
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
        selectedUserIds={userIds}
      />
      <PermissionsTable
        permissions={permissions}
        onCheckboxToggle={handlePermissionToggle}
        selectedPermissionIds={permissionIds}
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
            label={isEdit ? 'Edit' : 'Create'}
          />
        </div>
      </div>
    </div>
  );
};

export { UAMConfigurateGroup };
