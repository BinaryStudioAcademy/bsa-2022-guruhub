import { UserWithPermissions } from 'common/types/types';
import { UserTableAccessor } from 'components/uam/common/enums/enums';
import {
  UsersTableActionsProps,
  UsersTableRow,
} from 'components/uam/common/types/types';
import { Column } from 'react-table';

import { ActionsCell, DateCell } from '../../components/components';

const getUsersColumns = (
  user: UserWithPermissions,
  onUserDelete: (userId: number) => void,
): Column<UsersTableRow>[] => {
  return [
    {
      Header: 'ID',
      accessor: UserTableAccessor.ID,
      width: 50,
    },
    {
      Header: 'Full name',
      accessor: UserTableAccessor.FULL_NAME,
      minWidth: 125,
    },
    {
      Header: 'Email',
      accessor: UserTableAccessor.EMAIL,
      minWidth: 80,
    },
    {
      Header: 'Created',
      accessor: UserTableAccessor.CREATED_AT,
      Cell: DateCell,
      minWidth: 100,
    },
    {
      Header: 'Actions',
      accessor: ({ id }: UsersTableRow): UsersTableActionsProps => ({
        onDelete: onUserDelete,
        id,
        isCurrentSignedUser: user.id === id,
      }),
      Cell: ActionsCell,
      width: 80,
      minWidth: 80,
    },
  ];
};

export { getUsersColumns };
