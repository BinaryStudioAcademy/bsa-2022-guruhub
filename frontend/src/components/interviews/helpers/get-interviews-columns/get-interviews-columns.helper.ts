import { InterviewsTableAccessor } from 'components/interviews/common/enums/enums';
import { InterviewsTableRow } from 'components/interviews/common/types/types';
import { Column } from 'react-table';

import {
  CategoryCell,
  DateCell,
  IdCell,
  StatusCell,
} from '../../components/components';

const getInterviewsColumns = (): Column<InterviewsTableRow>[] => {
  return [
    {
      Header: 'Id',
      accessor: InterviewsTableAccessor.ID,
      Cell: IdCell,
      width: 50,
    },
    {
      Header: 'Name',
      accessor: InterviewsTableAccessor.NAME,
      width: 170,
      minWidth: 80,
    },
    {
      Header: 'Category',
      accessor: InterviewsTableAccessor.CATEGORY,
      Cell: CategoryCell,
      minWidth: 110,
    },
    {
      Header: 'Status',
      accessor: InterviewsTableAccessor.STATUS,
      Cell: StatusCell,
      width: 150,
      minWidth: 120,
    },
    {
      Header: 'Interviewer',
      accessor: InterviewsTableAccessor.INTERVIEWER,
      width: 170,
      minWidth: 120,
    },
    {
      Header: 'Date',
      accessor: InterviewsTableAccessor.DATE,
      Cell: DateCell,
      width: 140,
      minWidth: 70,
    },
  ];
};

export { getInterviewsColumns };
