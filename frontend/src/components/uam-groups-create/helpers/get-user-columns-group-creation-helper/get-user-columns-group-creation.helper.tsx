import { UsersGroupCreationDto } from 'common/types/types';
import { UserTableAccessor } from 'components/uam/common/enums/user-table-accessor.enum';
import { Column } from 'react-table';

const getGroupCreationUserColumns = (): Column<UsersGroupCreationDto>[] => {
  return [
    {
      Header: '',
      accessor: UserTableAccessor.CHECKBOX,
    },
    {
      Header: 'Name',
      accessor: UserTableAccessor.FULL_NAME,
    },
    {
      Header: 'Email',
      accessor: UserTableAccessor.EMAIL,
    },
    {
      Header: 'Worker ID',
      accessor: UserTableAccessor.ID,
    },
  ];
};

export { getGroupCreationUserColumns };
