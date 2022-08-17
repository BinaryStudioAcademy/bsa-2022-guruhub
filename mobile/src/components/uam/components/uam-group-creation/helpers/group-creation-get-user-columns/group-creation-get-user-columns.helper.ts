import { TableColumn } from '~/common/types/ui/table-column.type';
import { UserTableAccessor } from '~/components/uam/components/uam-group-creation/common/enums/enums';
import { UsersTableRow } from '~/components/uam/components/uam-group-creation/common/types/types';

const getUserColumns = (): TableColumn<UsersTableRow>[] => {
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
