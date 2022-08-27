import { FC, InterviewsGetOtherItemResponseDto } from 'common/types/types';

import { OtherApplicationsTable } from './components/components';

type Props = {
  interviews: InterviewsGetOtherItemResponseDto[];
  page: number;
  onPageChange: (page: number) => void;
  totalOtherInterviews: number;
};

const OtherApplications: FC<Props> = ({
  interviews,
  page,
  onPageChange,
  totalOtherInterviews,
}) => {
  return (
    <div>
      <h1>Other Applications</h1>
      <OtherApplicationsTable
        interviews={interviews}
        page={page}
        onPageChange={onPageChange}
        totalOtherInterviews={totalOtherInterviews}
      />
    </div>
  );
};

export { OtherApplications };
