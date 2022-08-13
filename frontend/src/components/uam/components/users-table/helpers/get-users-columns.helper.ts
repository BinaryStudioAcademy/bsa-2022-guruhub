import { Column } from 'react-table';

import { UserTableAccessor } from '../../../common/enums/enums';
import {
  UsersTableActionsProps,
  UsersTableRow,
} from '../../../common/types/types';
import { ActionsCell } from '../components/components';

const getUsersColumns = (
  onUserDelete: (userId: number) => void,
): Column<UsersTableRow>[] => {
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
      accessor: ({ id }: UsersTableRow): UsersTableActionsProps => ({
        onDelete: onUserDelete,
        id,
      }),
      Cell: ActionsCell,
    },
  ];
};

export { getUsersColumns };
