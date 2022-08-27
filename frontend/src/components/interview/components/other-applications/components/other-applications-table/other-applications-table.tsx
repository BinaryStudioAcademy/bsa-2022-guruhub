import { PaginationDefaultValue } from 'common/enums/enums';
import { FC, InterviewsGetOtherItemResponseDto } from 'common/types/types';
import { Pagination, Table } from 'components/common/common';
import { OtherApplicationsTableRow } from 'components/interview/common/types/other-applications-table-row.type';
import {
  getOtherApplicationsColumns,
  getOtherApplicationsRows,
} from 'components/interview/components/other-applications/helpers/helpers';
import { useMemo } from 'hooks/hooks';
import { Column } from 'react-table';

type Props = {
  interviews: InterviewsGetOtherItemResponseDto[];
  page: number;
  onPageChange: (page: number) => void;
  totalOtherInterviews: number;
};

const OtherApplicationsTable: FC<Props> = ({
  interviews,
  page,
  onPageChange,
  totalOtherInterviews,
}) => {
  const columns = useMemo<Column<OtherApplicationsTableRow>[]>(() => {
    return getOtherApplicationsColumns();
  }, []);

  const data = getOtherApplicationsRows(interviews);

  return (
    <div>
      <Table data={data} columns={columns} />
      <Pagination
        currentPage={page}
        onPageChange={onPageChange}
        pageSize={PaginationDefaultValue.DEFAULT_COUNT}
        totalCount={totalOtherInterviews}
      />
    </div>
  );
};

export { OtherApplicationsTable };
