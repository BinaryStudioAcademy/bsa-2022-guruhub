import { AppRoute } from 'common/enums/enums';
import { FC, GroupsConfigureRequestDto } from 'common/types/types';
import { Button, Input } from 'components/common/common';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useEffect,
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
  const { permissions, group } = useAppSelector(
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
  } = useSelectedItems<number>(group?.permissionIds ?? []);
  const {
    items: userIds,
    handleToggle: handleUserToggle,
    setItems: setDefaultUserIds,
  } = useSelectedItems<number>(group?.userIds ?? []);

  const onSubmit = (): void => {
    if (!isEdit) {
      dispatch(
        uamConfigureGroupActions.createGroup({
          name: control._formValues.name,
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
          name: control._formValues.name,
          permissionIds,
          userIds,
        },
      }),
    );
  };

  useEffect(() => {
    dispatch(uamConfigureGroupActions.getPermissions());

    if (isEdit) {
      dispatch(uamConfigureGroupActions.getGroupById({ id: Number(id) }));
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
          name={GroupConfigureFieldsName.NAME}
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

export { UAMConfigureGroup };
