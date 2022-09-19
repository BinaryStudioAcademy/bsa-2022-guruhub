import { FC } from 'common/types/types';
import { UsersTableRow } from 'components/uam/common/types/types';
import { CellProps } from 'react-table';

const IdCell: FC<CellProps<UsersTableRow>> = ({ value }) => {
  return <span>#{value}</span>;
};

export { IdCell };
