import { TableColumn } from '~/common/types/types';
import { InterviewsTableAccessor } from '~/components/interviews/common/enums/enums';
import { InterviewsTableData } from '~/components/interviews/common/types/types';

const getOtherInterviewsColumns = (): TableColumn<InterviewsTableData>[] => {
  return [
    {
      header: 'Id',
      accessor: InterviewsTableAccessor.ID,
    },
    {
      header: 'Name',
      accessor: InterviewsTableAccessor.NAME,
    },
    {
      header: 'Category',
      accessor: InterviewsTableAccessor.CATEGORY,
    },
    {
      header: 'Status',
      accessor: InterviewsTableAccessor.STATUS,
    },
    {
      header: 'Interviewer',
      accessor: InterviewsTableAccessor.INTERVIEWER,
    },
    {
      header: 'Date',
      accessor: InterviewsTableAccessor.DATE,
    },
  ];
};

export { getOtherInterviewsColumns };
