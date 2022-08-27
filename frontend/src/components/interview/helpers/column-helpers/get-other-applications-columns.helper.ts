import { OtherApplicationsTableAccessor } from 'components/interview/common/enums/enums';
import { OtherApplicationsTableRow } from 'components/interview/common/types/other-applications-table-row.type';
import { Column } from 'react-table';

const getOtherApplicationsColumns = (): Column<OtherApplicationsTableRow>[] => {
  return [
    {
      Header: 'ID',
      accessor: OtherApplicationsTableAccessor.ID,
    },
    {
      Header: 'Name',
      accessor: OtherApplicationsTableAccessor.NAME,
    },
    {
      Header: 'Category',
      accessor: OtherApplicationsTableAccessor.CATEGORY,
    },
    {
      Header: 'Status',
      accessor: OtherApplicationsTableAccessor.STATUS,
    },
    {
      Header: 'Interviewer',
      accessor: OtherApplicationsTableAccessor.INTERVIEWER,
    },
    {
      Header: 'Date',
      accessor: OtherApplicationsTableAccessor.DATE,
    },
  ];
};

export { getOtherApplicationsColumns };
