import { PaginationDefaultValue } from 'common/enums/enums';
import { FC, InterviewsGetOtherItemResponseDto } from 'common/types/types';
import { Table } from 'components/common/common';
import { OtherApplicationsTableRow } from 'components/interview/common/types/types';
import {
  getOtherApplicationsColumns,
  getOtherApplicationsRows,
} from 'components/interview/components/other-applications-table/helpers/helpers';
import { useMemo } from 'hooks/hooks';
import { Column } from 'react-table';

import styles from './styles.module.scss';

type Props = {
  interviews: InterviewsGetOtherItemResponseDto[];
  page: number;
  onPageChange: (page: number) => void;
  totalOtherInterviewsNumber: number;
  hasPermission: boolean;
};

const OtherApplicationsTable: FC<Props> = ({
  interviews,
  page,
  onPageChange,
  totalOtherInterviewsNumber,
  hasPermission,
}) => {
  const columns = useMemo<Column<OtherApplicationsTableRow>[]>(() => {
    return getOtherApplicationsColumns(hasPermission);
  }, []);

  const data = useMemo<OtherApplicationsTableRow[]>(() => {
    return getOtherApplicationsRows(interviews);
  }, [interviews]);

  return (
    <div className={styles.otherApplications}>
      <Table
        data={data}
        columns={columns}
        currentPage={page}
        onPageChange={onPageChange}
        pageSize={PaginationDefaultValue.DEFAULT_COUNT}
        totalCount={totalOtherInterviewsNumber}
      />
    </div>
  );
};

export { OtherApplicationsTable };
