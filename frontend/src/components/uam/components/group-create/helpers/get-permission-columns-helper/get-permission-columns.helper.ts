import { PermissionsGroupCreationDto } from 'common/types/types';
import { Column } from 'react-table';

import { PermissionTableAccessor } from '../../common/enums/enums';

const getPermissionsColumns = (): Column<PermissionsGroupCreationDto>[] => {
  return [
    {
      Header: '',
      accessor: PermissionTableAccessor.CHECKBOX,
    },
    {
      Header: 'Policy name',
      accessor: PermissionTableAccessor.NAME,
    },
    {
      Header: 'Policy ID',
      accessor: PermissionTableAccessor.ID,
    },
  ];
};

export { getPermissionsColumns };
