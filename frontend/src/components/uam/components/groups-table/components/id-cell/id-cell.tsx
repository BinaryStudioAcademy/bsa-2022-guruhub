import { FC } from 'common/types/types';
import { GroupsTableRow } from 'components/uam/common/types/types';
import { CellProps } from 'react-table';

const IdCell: FC<CellProps<GroupsTableRow>> = ({ value }) => {
  return <span>#{value}</span>;
};

export { IdCell };
