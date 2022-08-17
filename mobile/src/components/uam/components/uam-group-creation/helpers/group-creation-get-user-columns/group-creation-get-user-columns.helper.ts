import { ReactElement } from 'react';

import { TableColumn } from '~/common/types/ui/table-column.type';
import { UserTableAccessor } from '~/components/uam/components/uam-group-creation/common/enums/enums';

type UsersTableData = {
  id: number;
  email: string;
  fullName: string;
  checkbox: JSX.Element | string | ReactElement;
};

const getUserColumns = (): TableColumn<UsersTableData>[] => {
  return [
    {
      header: '',
      accessor: UserTableAccessor.CHECKBOX,
    },
    {
      header: 'Name',
      accessor: UserTableAccessor.FULL_NAME,
    },
    {
      header: 'Email',
      accessor: UserTableAccessor.EMAIL,
    },
    {
      header: 'ID',
      accessor: UserTableAccessor.ID,
    },
  ];
};

export { getUserColumns };
