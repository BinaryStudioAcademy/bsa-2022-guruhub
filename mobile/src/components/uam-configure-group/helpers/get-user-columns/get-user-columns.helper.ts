import { TableColumn } from '~/common/types/ui/table-column.type';
import { UserTableAccessor } from '~/components/uam-configure-group/common/enums/enums';
import { UsersTableRow } from '~/components/uam-configure-group/common/types/types';

const getUserColumns = (): TableColumn<UsersTableRow>[] => {
  return [
    {
      header: '',
      accessor: UserTableAccessor.CHECKBOX,
    },
    {
      header: 'ID',
      accessor: UserTableAccessor.ID,
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
      header: 'Created At',
      accessor: UserTableAccessor.CREATED_AT,
    },
  ];
};

export { getUserColumns };
