import { FC } from 'common/types/types';
import { GroupConfigureUsersTableRow } from 'components/uam-configure-group/common/types/group-configure-users-table-row.type';
import { getFormattedDate } from 'helpers/helpers';
import { CellProps } from 'react-table';

const DateCell: FC<CellProps<GroupConfigureUsersTableRow>> = ({ value }) => {
  const formattedDate = getFormattedDate(value, 'distance');

  return <span>{formattedDate} ago</span>;
};

export { DateCell };
