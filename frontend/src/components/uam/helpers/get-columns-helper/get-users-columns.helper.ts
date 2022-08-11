import { UsersGetAllItemResponseDto } from 'common/types/types';
import { UserTableAccessor } from 'components/uam/common/enums/enums';
import { Column } from 'react-table';

const getUsersColumns = (): Column<UsersGetAllItemResponseDto>[] => {
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
  ];
};

export { getUsersColumns };
