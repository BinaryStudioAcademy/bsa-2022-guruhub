import { TableColumn } from '~/common/types/types';
import { GroupsTableAccessor } from '~/components/uam/common/enums/enums';
import { GroupsTableData } from '~/components/uam/common/types/types';

const getGroupsColumns = (): TableColumn<GroupsTableData>[] => {
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
    {
      header: 'Created',
      accessor: GroupsTableAccessor.CREATED_AT,
    },
    {
      header: 'Actions',
      accessor: GroupsTableAccessor.ACTION,
    },
  ];
};

export { getGroupsColumns };
