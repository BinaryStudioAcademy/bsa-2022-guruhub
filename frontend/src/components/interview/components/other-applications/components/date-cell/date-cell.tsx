import { FC } from 'common/types/types';
import { OtherApplicationsTableRow } from 'components/interview/common/types/other-applications-table-row.type';
import { getFormattedDate } from 'helpers/helpers';
import { CellProps } from 'react-table';

const DateCell: FC<CellProps<OtherApplicationsTableRow>> = ({ value }) => {
  const formattedDate = value
    ? getFormattedDate(value, 'kk:mm, dd/MM/yyyy')
    : 'Not Set';

  return <span>{formattedDate}</span>;
};

export { DateCell };
