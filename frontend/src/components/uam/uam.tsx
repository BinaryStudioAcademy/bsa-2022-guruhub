import { useEffect, useAppDispatch, useAppSelector } from 'hooks/hooks';
import { FC } from 'common/types/types';
import { UsersTable } from './components/users-table/users-table';
import { uamActions } from 'store/actions';
import { usersColumns } from './common/users-columns';
import styles from './styles.module.scss';

const Uam: FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.uam);

  useEffect(() => {
    dispatch(uamActions.getUsers());
  }, []);

  return (
    <div className={styles.uam}>
      <h1 className={styles.pageTitle}>User Access Managment</h1>
      <UsersTable data={users} columns={usersColumns} />
    </div>
  );
};

export { Uam };
