import { Checkbox } from 'components/common/common';
import { FC } from 'react';
import { CellProps } from 'react-table';

import {
  PermissionsTableActionsProps,
  PermissionsTableRow,
} from '../../../../common/types/types';

const PermissionsActionsCell: FC<
  CellProps<PermissionsTableRow, PermissionsTableActionsProps>
> = ({ value: { id, name, register, control } }) => {
  return <Checkbox id={id} name={name} control={control} register={register} />;
};

export { PermissionsActionsCell };
