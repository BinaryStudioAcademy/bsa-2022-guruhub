import { AppRoute } from 'common/enums/enums';
import { FC, GroupsCreateRequestDto } from 'common/types/types';
import { Button, Input } from 'components/common/common';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useEffect,
  useNavigate,
} from 'hooks/hooks';
import { batch } from 'react-redux';
import { uamActions } from 'store/actions';
import { groupCreate } from 'validation-schemas/validation-schemas';

import { DEFAULT_CREATE_GROUP_PAYLOAD } from './common/default-create-group-payload';
import { GroupCreationFieldsName } from './common/enums/enums';
import { PermissionsTable } from './components/permissions-table/permissions-table';
import { UsersTable } from './components/users-table/users-table';
import styles from './styles.module.scss';

const UAMGroupsCreate: FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.uam);
  const { permissions } = useAppSelector((state) => state.uam);
  const navigate = useNavigate();
  const { register, control, handleSubmit, errors } =
    useAppForm<GroupsCreateRequestDto>({
      defaultValues: DEFAULT_CREATE_GROUP_PAYLOAD,
      validationSchema: groupCreate,
    });

  const handleCancelClick = (): void => {
    navigate(AppRoute.UAM);
  };

  const onSubmit = (data: GroupsCreateRequestDto): void => {
    dispatch(uamActions.createGroup(data));
  };

  useEffect(() => {
    batch(() => {
      dispatch(uamActions.getUsers({ page: 1, count: 10 }));
      dispatch(uamActions.getPermissions());
    });
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
          label={'Group name'}
          name={GroupCreationFieldsName.NAME}
          placeholder={'Enter group name'}
          type={'text'}
        />
        <UsersTable users={users.items} useFormData={useFormData} />
        <PermissionsTable permissions={permissions} useFormData={useFormData} />
        <div className={styles.btnsBlock}>
          <div className={styles.btnsWrapper}>
            <Button
              type={'button'}
              inversedStyles={true}
              label={'Cancel'}
              onClick={handleCancelClick}
            />
            <Button type={'submit'} label="Create" />
          </div>
        </div>
      </form>
    </div>
  );
};

export { UAMGroupsCreate };
