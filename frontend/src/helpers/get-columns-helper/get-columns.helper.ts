import {
  PermissionsGroupCreationDto,
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

const getGroupCreationUserColumns = (): Column<UsersGroupCreationDto>[] => {
  return [
    {
      Header: '',
      accessor: 'checkbox',
    },
    {
      Header: 'Name',
      accessor: 'fullName',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Worker ID',
      accessor: 'id',
    },
  ];
};

const getGroupCreationPermissionColumns =
  (): Column<PermissionsGroupCreationDto>[] => {
    return [
      {
        Header: '',
        accessor: 'checkbox',
      },
      {
        Header: 'Policy name',
        accessor: 'name',
      },
      {
        Header: 'Policy ID',
        accessor: 'id',
      },
    ];
  };

export {
  getColumns,
  getGroupCreationPermissionColumns,
  getGroupCreationUserColumns,
};
