import {
  UsersGetAllItemResponseDto,
  UsersGroupCreationDto,
} from 'common/types/types';
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

const getGroupCreationColumns = (): Column<UsersGroupCreationDto>[] => {
  return [
    {
      Header: '',
      accessor: 'checkbox',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
  ];
};

export { getColumns, getGroupCreationColumns };
