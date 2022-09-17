import { FC } from 'common/types/types';
import { PermissionsTableRow } from 'components/uam-configure-group/common/types/types';
import { CellProps } from 'react-table';

const IdCell: FC<CellProps<PermissionsTableRow>> = ({ value }) => {
  return <span>#{value}</span>;
};

export { IdCell };
