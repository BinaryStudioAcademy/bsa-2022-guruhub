import { FC, UsersGetAllItemResponseDto } from 'common/types/types';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { Column } from 'react-table';
import { uamActions } from 'store/actions';

import { UsersTable } from './components/components';
import { getColumns, getRows } from './helpers/helpers';
import styles from './styles.module.scss';

const UAM: FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.uam);

  useEffect(() => {
    dispatch(uamActions.getUsers());
  }, []);

  const columns: Column<UsersGetAllItemResponseDto>[] = getColumns();
  const rows: UsersGetAllItemResponseDto[] = getRows(users);

  const deleteUser = (userId: string): void => {
    dispatch(uamActions.deleteUser({ id: userId }));
  };

  return (
    <div className={styles.uam}>
      <h1 className={styles.pageTitle}>User Access Managment</h1>
      <UsersTable data={rows} columns={columns} onClick={deleteUser} />
    </div>
  );
};

export { UAM };
