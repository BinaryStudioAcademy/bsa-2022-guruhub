import { GroupsGetAllItemResponseDto } from 'common/types/types';
import { GroupsTableAccessor } from 'components/uam/common/enums/enums';

const getGroupsRows = (
  groups: GroupsGetAllItemResponseDto[],
): GroupsGetAllItemResponseDto[] => {
  return groups.map((group) => ({
    [GroupsTableAccessor.ID]: group.id,
    [GroupsTableAccessor.NAME]: group.name,
    [GroupsTableAccessor.KEY]: group.key,
  }));
};

export { getGroupsRows };
