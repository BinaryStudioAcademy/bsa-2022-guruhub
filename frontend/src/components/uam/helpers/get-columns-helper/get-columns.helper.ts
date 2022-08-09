import { UsersGetAllItemResponseDto } from 'common/types/types';
import { Column } from 'react-table';

const getColumns = (): Column<UsersGetAllItemResponseDto>[] => {
  return [
    {
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
  ];
};

export { getColumns };
