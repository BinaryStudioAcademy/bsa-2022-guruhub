import { GroupsTableAccessor } from 'components/uam/common/enums/enums';
import {
  GroupsTableActionsProps,
  GroupsTableRow,
} from 'components/uam/common/types/types';
import { Column } from 'react-table';

import { ActionsCell, DateCell, IdCell } from '../../components/components';

const getGroupsColumns = (
  onGroupDelete: (groupId: number) => void,
): Column<GroupsTableRow>[] => {
  return [
    {
      Header: 'ID',
      accessor: GroupsTableAccessor.ID,
      Cell: IdCell,
      width: 50,
    },
    {
      Header: 'Name',
      accessor: GroupsTableAccessor.NAME,
      minWidth: 80,
    },
    {
      Header: 'Key',
      accessor: GroupsTableAccessor.KEY,
      minWidth: 60,
    },
    {
      Header: 'Created',
      accessor: GroupsTableAccessor.CREATED_AT,
      Cell: DateCell,
      minWidth: 100,
    },
    {
      Header: 'Actions',
      accessor: ({ id }: GroupsTableRow): GroupsTableActionsProps => ({
        onDelete: onGroupDelete,
        id,
      }),
      Cell: ActionsCell,
      width: 120,
      minWidth: 120,
    },
  ];
};

export { getGroupsColumns };
