import { TableColumn } from '~/common/types/ui/table-column.type';

import { UserTableAccessor } from '../../common/enums/enums';

type UsersTableData = {
  id: number;
  email: string;
  fullName: string;
  createdAt: string;
  checkbox: string;
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
