import { UsersGetAllItemResponseDto } from 'common/types/types';
import {
  UserTableAccessor,
  UserTableHeader,
} from 'components/uam/common/enums/enums';
import { Column } from 'react-table';

const getColumns = (): Column<UsersGetAllItemResponseDto>[] => {
  return [
    {
      Header: UserTableHeader.ID,
      accessor: UserTableAccessor.ID,
    },
    {
      Header: UserTableHeader.FULL_NAME,
      accessor: UserTableAccessor.FULL_NAME,
    },
    {
      Header: UserTableHeader.EMAIL,
      accessor: UserTableAccessor.EMAIL,
    },
    {
      Header: UserTableHeader.CREATED_AT,
      accessor: UserTableAccessor.CREATED_AT,
    },
  ];
};

export { getColumns };
