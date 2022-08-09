import { ReactComponent as BillingIcon } from 'assets/icons/billing.svg';
import { ReactComponent as CourseIcon } from 'assets/icons/course.svg';
import { ReactComponent as EducationIcon } from 'assets/icons/education.svg';
import { ReactComponent as HomeIcon } from 'assets/icons/home.svg';
import { ReactComponent as MentorsIcon } from 'assets/icons/mentors.svg';
import { ReactComponent as SettingsIcon } from 'assets/icons/settings.svg';
import { FC } from 'common/types/types';

const icons = {
  home: HomeIcon,
  course: CourseIcon,
  mentors: MentorsIcon,
  education: EducationIcon,
  billing: BillingIcon,
  settings: SettingsIcon,
};

type Props = {
  name: 'home' | 'course' | 'mentors' | 'education' | 'billing' | 'settings';
  className?: string;
};

const Icon: FC<Props> = ({ name, className }) => {
  const SelectedIcon = icons[name];

  return <SelectedIcon className={className} />;
};

export { Icon };
