import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Button } from 'components/common/common';
import { GroupsCreateRequestDto } from 'guruhub-shared/common/types/groups/groups';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useEffect,
  useNavigate,
} from 'hooks/hooks';
import { batch } from 'react-redux';
import { groupCreationActions, uamActions } from 'store/actions';

import { DEFAULT_CREATE_GROUP_PAYLOAD } from './common';
import styles from './styles.module.scss';
import { GroupCreationPermissionsTable } from './tables/group-creation-permissions-table';
import { GroupCreationUsersTable } from './tables/group-creation-users-table';

const UAMGroupsCreate: FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.uam);
  const { permissions } = useAppSelector((state) => state.uamGroupCreation);
  const navigate = useNavigate();
  const { control, handleSubmit, errors } = useAppForm<GroupsCreateRequestDto>({
    defaultValues: DEFAULT_CREATE_GROUP_PAYLOAD,
  });

  const handleCancelClick = (): void => {
    navigate(AppRoute.UAM);
  };

  useEffect(() => {
    batch(() => {
      dispatch(uamActions.getUsers({ page: 1, count: 10 }));
      dispatch(groupCreationActions.getPermissions());
    });
  }, []);

  const useFormData = {
    control,
    errors,
  };

  const onSubmit = (data: GroupsCreateRequestDto): void => {
    alert(JSON.stringify(data)); // just to show what we get from form
  };

  return (
    <div className={styles.main}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.groupForm}>
        <div className={styles.groupFormHeaderWrapper}>
          <h2 className={styles.groupFormHeading}>Create group</h2>
        </div>
        <GroupCreationUsersTable
          users={users.items}
          useFormData={useFormData}
        />
        <GroupCreationPermissionsTable
          permissions={permissions}
          useFormData={useFormData}
        />
        <div className={styles.btnsWrapper}>
          <Button
            type="button"
            label="Cancel"
            className="btnSecondary"
            onClick={handleCancelClick}
          />
          <Button type="submit" label="Create" className="btnPrimary" />
        </div>
      </form>
    </div>
  );
};

export { UAMGroupsCreate };
