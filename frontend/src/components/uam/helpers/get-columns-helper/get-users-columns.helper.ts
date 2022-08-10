import { UsersGetAllItemResponseDto } from 'common/types/types';
import { Column } from 'react-table';

import { UserTableHeader } from '../../common/enums/enums';

const getUsersColumns = (): Column<UsersGetAllItemResponseDto>[] => {
  return [
    {
      Header: UserTableHeader.ID,
      accessor: UserTableHeader.ID,
    },
    {
      Header: UserTableHeader.FULL_NAME,
      accessor: UserTableHeader.FULL_NAME,
    },
    {
      Header: UserTableHeader.EMAIL,
      accessor: UserTableHeader.EMAIL,
    },
    {
      Header: UserTableHeader.CREATED_AT,
      accessor: UserTableHeader.CREATED_AT,
    },
  ];
};

export { getUsersColumns };
