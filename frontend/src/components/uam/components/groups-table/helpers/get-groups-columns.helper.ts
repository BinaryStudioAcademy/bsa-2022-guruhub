import { GroupsItemResponseDto } from 'common/types/types';
import { GroupsTableAccessor } from 'components/uam/common/enums/enums';
import { GroupsTableActionsProps } from 'components/uam/common/types/types';
import { Column } from 'react-table';

import { ActionsCell, DateCell } from '../components/components';

const getGroupsColumns = (
  onGroupDelete: (groupId: number) => void,
): Column<GroupsItemResponseDto>[] => {
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
      Header: 'Created',
      accessor: GroupsTableAccessor.CREATED_AT,
      Cell: DateCell,
    },
    {
      Header: 'Actions',
      accessor: ({ id }: GroupsItemResponseDto): GroupsTableActionsProps => ({
        onDelete: onGroupDelete,
        id,
      }),
      Cell: ActionsCell,
    },
  ];
};

export { getGroupsColumns };
