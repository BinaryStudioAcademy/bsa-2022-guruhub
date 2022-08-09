import { FC } from 'common/types/types';
import { Button } from 'components/common/common';
import { Table } from 'components/common/table/table';
import {
  getGroupCreationPermissionColumns,
  getGroupCreationUserColumns,
} from 'helpers/get-columns-helper/get-columns.helper';
import {
  getGroupCreationPermissionRows,
  getGroupCreationUserRows,
} from 'helpers/get-rows-helper/get-rows.helper';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useNavigate,
} from 'hooks/hooks';
import { uamActions } from 'store/actions';

import styles from './group-creation.module.scss';

const GroupCreation: FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.uam);
  const { permissions } = useAppSelector((state) => state.uam);
  const navigate = useNavigate();

  const handleCancelClick = (): void => {
    navigate('/uam');
  };

  useEffect(() => {
    dispatch(uamActions.getUsers());
    dispatch(uamActions.getPermissions());
  }, []);

  const userRows = getGroupCreationUserRows(users);
  const userColumns = getGroupCreationUserColumns();

  const permissionColumns = getGroupCreationPermissionColumns();
  const permissionRows = getGroupCreationPermissionRows(permissions);

  return (
    <div className={styles.main}>
      <div className={styles.groupForm}>
        <div className={styles.groupFormHeaderWrapper}>
          <h2 className={styles.groupFormHeading}>Create group</h2>
        </div>
        <div className={styles.groupWorkers}>
          <h5 className={styles.groupSubHeading}>
            Add workers to the Group - Optional
          </h5>
          <Table data={userRows} columns={userColumns} />
          <span className={styles.groupWorkersAmount}>
            {users.items.length} results
          </span>
        </div>
        <div className={styles.groupPermissions}>
          <h5 className={styles.groupSubHeading}>
            Attach permissions policies
          </h5>
          <Table data={permissionRows} columns={permissionColumns} />
        </div>
        <div className={styles.btnsWrapper}>
          <Button
            type={'button'}
            label={'Cancel'}
            className={styles.btnSecondary}
            onClick={handleCancelClick}
          />
          <Button
            type={'button'}
            label={'Create'}
            className={styles.btnPrimary}
          />
        </div>
      </div>
    </div>
  );
};

export { GroupCreation };
