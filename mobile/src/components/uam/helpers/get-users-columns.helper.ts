import { TableColumn } from '~/common/types/ui/ui';

import { UserTableAccessor } from '../common/enums/enums';
import { UsersTableData } from '../common/types/types';

const getUsersColumns = (): TableColumn<UsersTableData>[] => {
  return [
    {
      header: 'ID',
      accessor: UserTableAccessor.ID,
    },
    {
      header: 'Full name',
      accessor: UserTableAccessor.FULL_NAME,
    },
    {
      header: 'Email',
      accessor: UserTableAccessor.EMAIL,
    },
    {
      header: 'Created',
      accessor: UserTableAccessor.CREATED_AT,
    },
    {
      header: 'Actions',
      accessor: UserTableAccessor.ACTION,
    },
  ];
};

export { getUsersColumns };
