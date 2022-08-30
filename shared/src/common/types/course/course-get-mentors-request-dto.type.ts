import { CourseMentorsFilteringDto } from '~/common/types/types';

type CourseGetMentorsRequestDto = {
  courseId: number;
  filteringOpts: CourseMentorsFilteringDto;
};

export { CourseGetMentorsRequestDto };
