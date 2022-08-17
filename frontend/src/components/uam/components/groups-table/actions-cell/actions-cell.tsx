import { FC, GroupsItemResponseDto } from 'common/types/types';
import { IconButton } from 'components/common/common';
import { GroupsTableActionsProps } from 'components/uam/common/types/types';
import { useNavigate } from 'hooks/hooks';
import { CellProps } from 'react-table';

const ActionsCell: FC<
  CellProps<GroupsItemResponseDto, GroupsTableActionsProps>
> = ({ value: { id } }) => {
  const navigate = useNavigate();

  const handleNavigateToEdit = (): void => {
    navigate(`/uam/configure-group/${id}`);
  };

  return <IconButton iconName="settings" onClick={handleNavigateToEdit} />;
};

export { ActionsCell };
