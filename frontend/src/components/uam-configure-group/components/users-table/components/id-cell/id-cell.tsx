import { FC } from 'common/types/types';
import { GroupConfigureUsersTableRow } from 'components/uam-configure-group/common/types/types';
import { CellProps } from 'react-table';

const IdCell: FC<CellProps<GroupConfigureUsersTableRow>> = ({ value }) => {
  return <span>{`#${value}`}</span>;
};

export { IdCell };
