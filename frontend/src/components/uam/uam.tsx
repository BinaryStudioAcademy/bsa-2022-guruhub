import { useEffect, useAppDispatch, useAppSelector } from 'hooks/hooks';
import { FC } from 'common/types/types';
import { UsersTable } from './users-table/users-table';
import { usersActions } from 'store/actions';
import { usersColumns } from './common/users-columns';
import styles from './styles.module.scss';

const Uam: FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(usersActions.getUsers());
  }, []);

  return (
    <div className={styles.uam}>
      <UsersTable data={users ?? []} columns={usersColumns} />
    </div>
  );
};

export { Uam };
