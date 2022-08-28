import { UserWithPermissions } from 'common/types/types';
import { UserTableAccessor } from 'components/uam/common/enums/enums';
import {
  UsersTableActionsProps,
  UsersTableRow,
} from 'components/uam/common/types/types';
import { Column } from 'react-table';

import { ActionsCell, DateCell } from '../components/components';

const getUsersColumns = (
  user: UserWithPermissions,
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
      Cell: DateCell,
    },
    {
      Header: 'Actions',
      accessor: ({ id }: UsersTableRow): UsersTableActionsProps => ({
        onDelete: onUserDelete,
        id,
        isCurrentSignedUser: user.id === id,
      }),
      Cell: ActionsCell,
    },
  ];
};

export { getUsersColumns };
