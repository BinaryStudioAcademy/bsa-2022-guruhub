import { FC, InterviewsGetOtherItemResponseDto } from 'common/types/types';

import { OtherApplicationsTable } from './components/components';

type Props = {
  interviews: InterviewsGetOtherItemResponseDto[];
  page: number;
  onPageChange: (page: number) => void;
  totalOtherInterviewsNumber: number;
};

const OtherApplications: FC<Props> = ({
  interviews,
  page,
  onPageChange,
  totalOtherInterviewsNumber,
}) => {
  return (
    <div>
      <h1>Other Applications</h1>
      <OtherApplicationsTable
        interviews={interviews}
        page={page}
        onPageChange={onPageChange}
        totalOtherInterviewsNumber={totalOtherInterviewsNumber}
      />
    </div>
  );
};

export { OtherApplications };
