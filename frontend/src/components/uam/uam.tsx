import { Column } from 'react-table';

import { useEffect, useAppDispatch, useAppSelector } from 'hooks/hooks';
import { FC, UsersGetAllItemResponseDto } from 'common/types/types';
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

  return (
    <div className={styles.uam}>
      <h1 className={styles.pageTitle}>User Access Managment</h1>
      <UsersTable data={rows} columns={columns} />
    </div>
  );
};

export { UAM };
