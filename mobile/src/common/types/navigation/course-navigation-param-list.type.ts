import { CourseScreenName } from '~/common/enums/enums';

type CourseNavigationParamList = {
  [CourseScreenName.EDIT_COURSE]: undefined;
  [CourseScreenName.COURSE]: undefined;
  [CourseScreenName.COURSE_MODULE]: undefined;
};

export { type CourseNavigationParamList };
