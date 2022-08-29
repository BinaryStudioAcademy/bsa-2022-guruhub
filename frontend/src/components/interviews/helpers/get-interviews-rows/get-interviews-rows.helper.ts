import { InterviewsGetAllItemResponseDto } from 'common/types/types';
import { InterviewsTableAccessor } from 'components/interviews/common/enums/enums';
import { InterviewsTableRow } from 'components/interviews/common/types/types';

const getInterviewsRows = (
  interviews: InterviewsGetAllItemResponseDto[],
): InterviewsTableRow[] => {
  return interviews.map(
    (interview): InterviewsTableRow => ({
      [InterviewsTableAccessor.ID]: interview.id,
      [InterviewsTableAccessor.NAME]:
        interview.interviewee.userDetails.fullName,
      [InterviewsTableAccessor.CATEGORY]: interview.courseCategory.name,
      [InterviewsTableAccessor.STATUS]: interview.status,
      [InterviewsTableAccessor.INTERVIEWER]:
        interview.interviewer?.userDetails.fullName,
      [InterviewsTableAccessor.DATE]: interview.interviewDate,
    }),
  );
};

export { getInterviewsRows };
