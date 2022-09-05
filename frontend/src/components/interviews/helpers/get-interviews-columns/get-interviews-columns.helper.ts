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
      width: 200,
    },
    {
      Header: 'Category',
      accessor: InterviewsTableAccessor.CATEGORY,
      Cell: CategoryCell,
      width: 200,
    },
    {
      Header: 'Status',
      accessor: InterviewsTableAccessor.STATUS,
      Cell: StatusCell,
      width: 200,
    },
    {
      Header: 'Interviewer',
      accessor: InterviewsTableAccessor.INTERVIEWER,
      width: 200,
    },
    {
      Header: 'Date',
      accessor: InterviewsTableAccessor.DATE,
      Cell: DateCell,
      width: 200,
    },
  ];
};

export { getInterviewsColumns };
