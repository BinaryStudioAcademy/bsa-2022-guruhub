import { Column } from 'react-table';
import { FC } from 'common/types/types';
import { UsersTable } from './users-table/users-table';
import styles from './styles.module.scss';

const Uam: FC = () => {
  const mockedData = [
    {
      col1: 'Hello',
      col2: 'World',
    },
    {
      col1: 'react-table',
      col2: 'rocks',
    },
    {
      col1: 'whatever',
      col2: 'you want',
    },
  ];

  const mockedColumns = [
    {
      Header: 'Column 1',
      accessor: 'col1',
    },
    {
      Header: 'Column 2',
      accessor: 'col2',
    },
  ];

  return (
    <div className={styles.uam}>
      <UsersTable data={mockedData} columns={mockedColumns as Column[]} />
    </div>
  );
};

export { Uam };
