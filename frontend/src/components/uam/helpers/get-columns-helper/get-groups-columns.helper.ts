import { GroupsItemResponseDto } from 'common/types/types';
import { GroupsTableAccessor } from 'components/uam/common/enums/enums';
import { Column } from 'react-table';

const getGroupsColumns = (): Column<GroupsItemResponseDto>[] => {
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
