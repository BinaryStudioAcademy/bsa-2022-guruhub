import { FC } from 'common/types/types';
import { Checkbox } from 'components/common/common';
import {
  GroupCreationUsersTableActionsProps,
  GroupCreationUsersTableRow,
} from 'components/groups-create/common/types/types';
import { useAppForm } from 'hooks/hooks';
import { CellProps } from 'react-table';

const UserActionCell: FC<
  CellProps<GroupCreationUsersTableRow, GroupCreationUsersTableActionsProps>
> = ({ value: { name, onToggle } }) => {
  const { control, errors } = useAppForm({ defaultValues: {} });

  return (
    <form onChange={onToggle}>
      <Checkbox errors={errors} name={name} control={control} />
    </form>
  );
};

export { UserActionCell };
