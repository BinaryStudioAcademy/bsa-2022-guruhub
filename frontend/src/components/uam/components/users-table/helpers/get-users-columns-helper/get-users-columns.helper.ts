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
      width: '5%',
    },
    {
      Header: 'Full name',
      accessor: UserTableAccessor.FULL_NAME,
      width: '30%',
    },
    {
      Header: 'Email',
      accessor: UserTableAccessor.EMAIL,
      width: '30%',
    },
    {
      Header: 'Created',
      accessor: UserTableAccessor.CREATED_AT,
      Cell: DateCell,
      width: '30%',
    },
    {
      Header: 'Actions',
      accessor: ({ id }: UsersTableRow): UsersTableActionsProps => ({
        onDelete: onUserDelete,
        id,
        isCurrentSignedUser: user.id === id,
      }),
      Cell: ActionsCell,
      width: '5%',
    },
  ];
};

export { getUsersColumns };
