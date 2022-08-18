import { AppRoute } from 'common/enums/enums';
import { FC, GroupsItemResponseDto } from 'common/types/types';
import { IconButton } from 'components/common/common';
import { GroupsTableActionsProps } from 'components/uam/common/types/types';
import { CellProps } from 'react-table';

const ActionsCell: FC<
  CellProps<GroupsItemResponseDto, GroupsTableActionsProps>
> = ({ value: { id } }) => {
  return (
    <IconButton
      iconName="settings"
      to={`${AppRoute.UAM_CONFIGURE_GROUP}/${id}`}
    />
  );
};

export { ActionsCell };
