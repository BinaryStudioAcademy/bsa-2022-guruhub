import { UsersGetAllItemResponseDto } from 'common/types/types';
import { Column } from 'react-table';

import { UserTableAccessor, UserTableHeader } from '../common/enums/enums';

const getColumns = (): Column<UsersGetAllItemResponseDto>[] => {
  return [
    {
      Header: UserTableHeader.ID,
      accessor: UserTableAccessor.ID,
    },
    {
      Header: UserTableHeader.EMAIL,
      accessor: UserTableAccessor.EMAIL,
    },
  ];
};

export { getColumns };
