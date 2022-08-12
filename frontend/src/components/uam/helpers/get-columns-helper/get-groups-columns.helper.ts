import { GroupItemResponseDto } from 'common/types/types';
import { GroupsTableAccessor } from 'components/uam/common/enums/enums';
import { Column } from 'react-table';

const getGroupsColumns = (): Column<GroupItemResponseDto>[] => {
  return [
    {
      Header: 'ID',
      accessor: GroupsTableAccessor.ID,
    },
    {
      Header: 'Name',
      accessor: GroupsTableAccessor.NAME,
    },
    {
      Header: 'Key',
      accessor: GroupsTableAccessor.KEY,
    },
  ];
};

export { getGroupsColumns };
