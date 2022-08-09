import { Column } from 'react-table';
import { useEffect, useAppDispatch, useAppSelector } from 'hooks/hooks';
import { FC } from 'common/types/types';
import { uamActions } from 'store/actions';
import { UsersTable } from './components/users-table/users-table';
import { getColumns } from './helpers/get-columns';
import styles from './styles.module.scss';

const Uam: FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.uam);

  useEffect(() => {
    dispatch(uamActions.getUsers());
  }, []);

  const columns: Column[] = getColumns();

  return (
    <div className={styles.uam}>
      <h1 className={styles.pageTitle}>User Access Managment</h1>
      <UsersTable data={users} columns={columns} />
    </div>
  );
};

export { Uam };
