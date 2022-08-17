import { FC } from 'common/types/types';
import { Checkbox } from 'components/common/common';
import {
  GroupConfigurateUsersTableActionsProps,
  GroupConfigurateUsersTableRow,
} from 'components/uam-configurate-group/common/types/types';
import { useAppForm, useEffect } from 'hooks/hooks';
import { CellProps } from 'react-table';

const UserActionCell: FC<
  CellProps<
    GroupConfigurateUsersTableRow,
    GroupConfigurateUsersTableActionsProps
  >
> = ({ value: { name, onToggle, isChecked } }) => {
  const { control, errors, reset } = useAppForm({
    defaultValues: {
      [name]: isChecked,
    },
  });

  useEffect(() => {
    reset({
      [name]: isChecked,
    });
  }, [name, isChecked]);

  return (
    <form onChange={onToggle}>
      <Checkbox errors={errors} name={name} control={control} />
    </form>
  );
};

export { UserActionCell };
