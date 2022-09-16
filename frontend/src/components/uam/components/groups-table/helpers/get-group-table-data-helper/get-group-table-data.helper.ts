import { GroupsItemResponseDto } from 'common/types/types';
import { GroupsTableRow } from 'components/uam/common/types/types';

const getGroupTableData = (
  groups: GroupsItemResponseDto[],
): GroupsTableRow[] => {
  return groups.map((group) => ({
    id: `#${group.id}`,
    name: group.name,
    key: group.key,
    createdAt: group.createdAt,
  }));
};

export { getGroupTableData };
