import { Checkbox } from 'components/common/common';
import { FC } from 'react';
import { CellProps } from 'react-table';

import {
  PermissionsTableActionsProps,
  PermissionsTableRow,
} from '../../common/types/types';

const PermissionsActionsCell: FC<
  CellProps<PermissionsTableRow, PermissionsTableActionsProps>
> = ({ value: { errors, name, onToggle } }) => {
  return (
    <form onChange={onToggle}>
      <Checkbox errors={errors} name={name} />
    </form>
  );
};

export { PermissionsActionsCell };
