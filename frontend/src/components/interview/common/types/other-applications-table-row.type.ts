import { InterviewStatus } from 'common/enums/enums';
import { CategoryGetAllItemResponseDto } from 'common/types/types';

type OtherApplicationsTableRow = {
  id: number;
  name: string;
  category: CategoryGetAllItemResponseDto;
  status: InterviewStatus;
  interviewer: string;
  date: string;
};

export { type OtherApplicationsTableRow };
