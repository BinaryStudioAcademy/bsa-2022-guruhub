import { TableColumn } from '~/common/types/ui/table-column.type';
import { UserTableAccessor } from '~/components/uam-groups-create/common/enums/enums';
import { UsersTableRow } from '~/components/uam-groups-create/common/types/types';

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
