import { FC, InterviewsGetOtherItemResponseDto } from 'common/types/types';

import { OtherApplicationsTable } from './components/components';

type Props = {
  interviews: InterviewsGetOtherItemResponseDto[];
};

const OtherApplications: FC<Props> = ({ interviews }) => {
  return (
    <div>
      <OtherApplicationsTable interviews={interviews} />
    </div>
  );
};

export { OtherApplications };
