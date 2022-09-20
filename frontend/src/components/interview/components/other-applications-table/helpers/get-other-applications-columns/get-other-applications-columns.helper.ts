import { OtherApplicationsTableAccessor } from 'components/interview/common/enums/enums';
import {
  OtherApplicationsCellProps,
  OtherApplicationsTableRow,
} from 'components/interview/common/types/types';
import { Column } from 'react-table';

import {
  CategoryCell,
  DateCell,
  IdCell,
  StatusCell,
} from '../../components/components';

const getOtherApplicationsColumns = (
  hasPermission: boolean,
): Column<OtherApplicationsTableRow>[] => {
  return [
    {
      Header: 'ID',
      accessor: ({
        id,
      }: OtherApplicationsTableRow): OtherApplicationsCellProps => ({
        id,
        hasPermission,
      }),
      Cell: IdCell,
      width: 50,
    },
    {
      Header: 'Name',
      accessor: OtherApplicationsTableAccessor.NAME,
      width: 130,
      minWidth: 80,
    },
    {
      Header: 'Category',
      accessor: OtherApplicationsTableAccessor.CATEGORY,
      Cell: CategoryCell,
      width: 160,
      minWidth: 110,
    },
    {
      Header: 'Status',
      accessor: OtherApplicationsTableAccessor.STATUS,
      Cell: StatusCell,
      width: 140,
      minWidth: 120,
    },
    {
      Header: 'Interviewer',
      accessor: OtherApplicationsTableAccessor.INTERVIEWER,
      width: 130,
      minWidth: 120,
    },
    {
      Header: 'Date',
      accessor: OtherApplicationsTableAccessor.DATE,
      Cell: DateCell,
      width: 140,
      minWidth: 70,
    },
  ];
};

export { getOtherApplicationsColumns };
