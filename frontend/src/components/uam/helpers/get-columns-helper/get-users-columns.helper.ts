import { UserTableAccessor } from 'components/uam/common/enums/enums';
import { UsersTableType } from 'components/uam/common/types/types';
import { Actions } from 'components/uam/components/users-table/components/components';
import { Column } from 'react-table';

const getUsersColumns = (
  onUserDelete: (userId: string) => void,
): Column<UsersTableType>[] => {
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
      accessor: UserTableAccessor.ACTIONS_PAYLOAD,
      Cell: (cell) =>
        Actions(String(cell.row.original.actions_payload), onUserDelete),
    },
  ];
};

export { getUsersColumns };
