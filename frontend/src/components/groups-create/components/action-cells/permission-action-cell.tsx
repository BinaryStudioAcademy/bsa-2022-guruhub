import { Checkbox } from 'components/common/common';
import { useAppForm } from 'hooks/hooks';
import { FC } from 'react';
import { CellProps } from 'react-table';

import {
  PermissionsTableActionsProps,
  PermissionsTableRow,
} from '../../common/types/types';

const PermissionsActionsCell: FC<
  CellProps<PermissionsTableRow, PermissionsTableActionsProps>
> = ({ value: { name, onToggle } }) => {
  const { control, errors } = useAppForm({ defaultValues: {} });

  return (
    <form onChange={onToggle}>
      <Checkbox errors={errors} name={name} control={control} />
    </form>
  );
};

export { PermissionsActionsCell };
