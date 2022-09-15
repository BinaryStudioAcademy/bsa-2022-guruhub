import { CourseModuleScreenName } from '~/common/enums/enums';

type TabCourseModuleNavigationItem = {
  name: CourseModuleScreenName;
  component: React.FC;
};

export { type TabCourseModuleNavigationItem };
