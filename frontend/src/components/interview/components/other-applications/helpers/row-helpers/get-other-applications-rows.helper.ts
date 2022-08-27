import { InterviewStatus } from 'common/enums/enums';
import { InterviewsGetOtherItemResponseDto } from 'common/types/types';
import { OtherApplicationsTableAccessor } from 'components/interview/common/enums/enums';
import { OtherApplicationsTableRow } from 'components/interview/common/types/types';

const getOtherApplicationsRows = (
  interviews: InterviewsGetOtherItemResponseDto[],
): OtherApplicationsTableRow[] => {
  return interviews.map((interview): OtherApplicationsTableRow => {
    const interviewerName = interview.interviewer
      ? interview.interviewer.userDetails.fullName
      : 'Not set';

    return {
      [OtherApplicationsTableAccessor.ID]: interview.id,
      [OtherApplicationsTableAccessor.NAME]:
        interview.interviewee.userDetails.fullName,
      [OtherApplicationsTableAccessor.CATEGORY]: interview.courseCategory.name,
      [OtherApplicationsTableAccessor.STATUS]:
        interview.status as InterviewStatus,
      [OtherApplicationsTableAccessor.INTERVIEWER]: interviewerName,
      [OtherApplicationsTableAccessor.DATE]: interview.interviewDate,
    };
  });
};

export { getOtherApplicationsRows };
