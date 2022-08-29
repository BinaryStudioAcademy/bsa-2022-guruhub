import { FC } from 'common/types/types';
import { TableDefaultValue } from 'components/interview/common/enums/table-default-value.enum';
import { OtherApplicationsTableRow } from 'components/interview/common/types/types';
import { getFormattedDate } from 'helpers/helpers';
import { CellProps } from 'react-table';

const DateCell: FC<CellProps<OtherApplicationsTableRow>> = ({ value }) => {
  const formattedDate = value
    ? getFormattedDate(value, 'kk:mm, dd/MM/yyyy')
    : TableDefaultValue.VALUE_NOT_SET;

  return <span>{formattedDate}</span>;
};

export { DateCell };
