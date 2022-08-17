import { GroupsItemResponseDto } from 'common/types/types';
import { GroupsTableAccessor } from 'components/uam/common/enums/enums';
import { GroupsTableActionsProps } from 'components/uam/common/types/types';
import { ActionsCell } from 'components/uam/components/groups-table/actions-cell/actions-cell';
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
    {
      Header: 'Actions',
      accessor: ({ id }: GroupsItemResponseDto): GroupsTableActionsProps => ({
        id,
      }),
      Cell: ActionsCell,
    },
  ];
};

export { getGroupsColumns };
