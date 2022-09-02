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
      width: '5%',
    },
    {
      Header: 'Name',
      accessor: InterviewsTableAccessor.NAME,
      width: '19%',
    },
    {
      Header: 'Category',
      accessor: InterviewsTableAccessor.CATEGORY,
      Cell: CategoryCell,
      width: '19%',
    },
    {
      Header: 'Status',
      accessor: InterviewsTableAccessor.STATUS,
      Cell: StatusCell,
      width: '19%',
    },
    {
      Header: 'Interviewer',
      accessor: InterviewsTableAccessor.INTERVIEWER,
      width: '19%',
    },
    {
      Header: 'Date',
      accessor: InterviewsTableAccessor.DATE,
      Cell: DateCell,
      width: '19%',
    },
  ];
};

export { getInterviewsColumns };
