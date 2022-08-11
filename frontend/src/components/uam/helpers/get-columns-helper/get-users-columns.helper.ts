import { UserTableAccessor } from 'components/uam/common/enums/enums';
import { UsersColumn } from 'components/uam/common/types/types';
import { Column } from 'react-table';

const getUsersColumns = (): Column<UsersColumn>[] => {
  return [
    {
      Header: 'ID',
      accessor: UserTableAccessor.ID,
    },
    {
      Header: 'Full name',
      accessor: UserTableAccessor.FULL_NAME,
    },
    {
      Header: 'Email',
      accessor: UserTableAccessor.EMAIL,
    },
    {
      Header: 'Created',
      accessor: UserTableAccessor.CREATED_AT,
    },
    {
      Header: 'Actions',
      accessor: UserTableAccessor.ACTIONS,
    },
  ];
};

export { getUsersColumns };
