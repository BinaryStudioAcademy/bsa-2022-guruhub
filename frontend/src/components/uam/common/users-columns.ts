import { Column } from 'react-table';

const usersColumns: Column[] = [
  {
    Header: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
];

export { usersColumns };
