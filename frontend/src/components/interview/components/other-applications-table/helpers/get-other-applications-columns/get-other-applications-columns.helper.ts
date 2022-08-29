import { OtherApplicationsTableAccessor } from 'components/interview/common/enums/enums';
import { OtherApplicationsTableRow } from 'components/interview/common/types/types';
import { Column } from 'react-table';

import {
  CategoryCell,
  DateCell,
  IdCell,
  StatusCell,
} from '../../../components';

const getOtherApplicationsColumns = (): Column<OtherApplicationsTableRow>[] => {
  return [
    {
      Header: 'ID',
      accessor: OtherApplicationsTableAccessor.ID,
      Cell: IdCell,
    },
    {
      Header: 'Name',
      accessor: OtherApplicationsTableAccessor.NAME,
    },
    {
      Header: 'Category',
      accessor: OtherApplicationsTableAccessor.CATEGORY,
      Cell: CategoryCell,
    },
    {
      Header: 'Status',
      accessor: OtherApplicationsTableAccessor.STATUS,
      Cell: StatusCell,
    },
    {
      Header: 'Interviewer',
      accessor: OtherApplicationsTableAccessor.INTERVIEWER,
    },
    {
      Header: 'Date',
      accessor: OtherApplicationsTableAccessor.DATE,
      Cell: DateCell,
    },
  ];
};

export { getOtherApplicationsColumns };
