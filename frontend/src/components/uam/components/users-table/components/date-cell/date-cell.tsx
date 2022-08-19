import { FC } from 'common/types/types';
import { UsersTableRow } from 'components/uam/common/types/types';
import moment from 'moment';
import { CellProps } from 'react-table';

const DateCell: FC<CellProps<UsersTableRow>> = ({ value }) => {
  return <span>{moment(value).fromNow()}</span>;
};

export { DateCell };
