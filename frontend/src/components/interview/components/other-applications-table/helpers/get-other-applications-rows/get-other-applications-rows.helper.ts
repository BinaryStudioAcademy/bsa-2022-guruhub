import { InterviewsGetOtherItemResponseDto } from 'common/types/types';
import { OtherApplicationsTableAccessor } from 'components/interview/common/enums/enums';
import { OtherApplicationsTableRow } from 'components/interview/common/types/types';

const getOtherApplicationsRows = (
  interviews: InterviewsGetOtherItemResponseDto[],
): OtherApplicationsTableRow[] => {
  return interviews.map((interview): OtherApplicationsTableRow => {
    const interviewerName =
      interview.interviewer?.userDetails?.fullName ?? 'Not set';

    return {
      [OtherApplicationsTableAccessor.ID]: `#${interview.id}`,
      [OtherApplicationsTableAccessor.NAME]:
        interview.interviewee.userDetails.fullName,
      [OtherApplicationsTableAccessor.CATEGORY]: interview.courseCategory,
      [OtherApplicationsTableAccessor.STATUS]: interview.status,
      [OtherApplicationsTableAccessor.INTERVIEWER]: interviewerName,
      [OtherApplicationsTableAccessor.DATE]: interview.interviewDate,
    };
  });
};

export { getOtherApplicationsRows };
