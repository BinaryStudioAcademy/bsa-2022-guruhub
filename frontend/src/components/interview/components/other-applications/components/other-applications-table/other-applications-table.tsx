import { FC, InterviewsGetOtherItemResponseDto } from 'common/types/types';
import { Table } from 'components/common/common';
import { OtherApplicationsTableRow } from 'components/interview/common/types/other-applications-table-row.type';
import {
  getOtherApplicationsColumns,
  getOtherApplicationsRows,
} from 'components/interview/helpers/helpers';
import { useMemo } from 'hooks/hooks';
import { Column } from 'react-table';

type Props = {
  interviews: InterviewsGetOtherItemResponseDto[];
};

const OtherApplicationsTable: FC<Props> = ({ interviews }) => {
  const columns = useMemo<Column<OtherApplicationsTableRow>[]>(() => {
    return getOtherApplicationsColumns();
  }, []);

  const data = getOtherApplicationsRows(interviews);

  return (
    <div>
      <Table data={data} columns={columns} />
    </div>
  );
};

export { OtherApplicationsTable };
