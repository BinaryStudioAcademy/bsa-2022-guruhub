import { AppRoute, PaginationDefaultValue } from 'common/enums/enums';
import { FC, InterviewsGetOtherItemResponseDto } from 'common/types/types';
import { Pagination, Table } from 'components/common/common';
import { OtherApplicationsTableRow } from 'components/interview/common/types/types';
import {
  getOtherApplicationsColumns,
  getOtherApplicationsRows,
} from 'components/interview/components/other-applications-table/helpers/helpers';
import { useMemo, useNavigate } from 'hooks/hooks';
import { Column } from 'react-table';

type Props = {
  interviews: InterviewsGetOtherItemResponseDto[];
  page: number;
  onPageChange: (page: number) => void;
  totalOtherInterviewsNumber: number;
};

const OtherApplicationsTable: FC<Props> = ({
  interviews,
  page,
  onPageChange,
  totalOtherInterviewsNumber,
}) => {
  const navigate = useNavigate();
  const columns = useMemo<Column<OtherApplicationsTableRow>[]>(() => {
    return getOtherApplicationsColumns();
  }, []);

  const data = useMemo<OtherApplicationsTableRow[]>(() => {
    return getOtherApplicationsRows(interviews);
  }, [interviews]);

  const handleRowClick = (row: OtherApplicationsTableRow): void => {
    navigate(`${AppRoute.INTERVIEW}/${row.id}`);
  };

  return (
    <div>
      <Table data={data} columns={columns} onRowClick={handleRowClick} />
      <Pagination
        currentPage={page}
        onPageChange={onPageChange}
        pageSize={PaginationDefaultValue.DEFAULT_COUNT}
        totalCount={totalOtherInterviewsNumber}
      />
    </div>
  );
};

export { OtherApplicationsTable };
