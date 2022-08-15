import { GroupsItemResponseDto, TableColumn } from '~/common/types/types';
import { GroupsTableAccessor } from '~/components/uam/common/enums/enums';

const getGroupsColumns = (): TableColumn<GroupsItemResponseDto>[] => {
  return [
    {
      header: 'ID',
      accessor: GroupsTableAccessor.ID,
    },
    {
      header: 'Name',
      accessor: GroupsTableAccessor.NAME,
    },
    {
      header: 'Key',
      accessor: GroupsTableAccessor.KEY,
    },
  ];
};

export { getGroupsColumns };
