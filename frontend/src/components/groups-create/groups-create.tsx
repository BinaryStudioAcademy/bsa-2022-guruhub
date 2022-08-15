import { AppRoute, PaginationDefaultValue } from 'common/enums/enums';
import { FC, GroupsCreateRequestDto } from 'common/types/types';
import { Button, Input } from 'components/common/common';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useEffect,
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
  const { register, control, handleSubmit, errors } =
    useAppForm<GroupsCreateRequestDto>({
      defaultValues: DEFAULT_CREATE_GROUP_PAYLOAD,
      validationSchema: groupCreate,
    });

  const onSubmit = (data: GroupsCreateRequestDto): void => {
    alert(JSON.stringify(data));
    //dispatch(groupsCreationActions.createGroup(data));
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

  const useFormData = {
    register,
    control,
    errors,
  };

  return (
    <div className={styles.groupCreationMain}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.groupForm}>
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
        <UsersTable users={users.items} useFormData={useFormData} />
        <PermissionsTable permissions={permissions} useFormData={useFormData} />
        <div className={styles.btnsBlock}>
          <div className={styles.btnsWrapper}>
            <Button
              type="button"
              btnType="outlined"
              label="Cancel"
              to={AppRoute.UAM}
            />
            <Button type="submit" label="Create" />
          </div>
        </div>
      </form>
    </div>
  );
};

export { UAMGroupsCreate };
