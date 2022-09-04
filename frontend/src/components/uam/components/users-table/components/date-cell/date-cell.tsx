import { FC } from 'common/types/types';
import { UsersTableRow } from 'components/uam/common/types/types';
import { getFormattedDate } from 'helpers/helpers';
import { CellProps } from 'react-table';

const DateCell: FC<CellProps<UsersTableRow>> = ({ value }) => {
  return <span>{getFormattedDate(value, 'HH:mm dd.MM.yyyy')}</span>;
};

export { DateCell };
