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
    },
    {
      Header: 'Name',
      accessor: InterviewsTableAccessor.NAME,
    },
    {
      Header: 'Category',
      accessor: InterviewsTableAccessor.CATEGORY,
      Cell: CategoryCell,
    },
    {
      Header: 'Status',
      accessor: InterviewsTableAccessor.STATUS,
      Cell: StatusCell,
    },
    {
      Header: 'Interviewer',
      accessor: InterviewsTableAccessor.INTERVIEWER,
    },
    {
      Header: 'Date',
      accessor: InterviewsTableAccessor.DATE,
      Cell: DateCell,
    },
  ];
};

export { getInterviewsColumns };
