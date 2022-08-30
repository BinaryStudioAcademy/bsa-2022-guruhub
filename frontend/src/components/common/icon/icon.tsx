import { ReactComponent as BillingIcon } from 'assets/icons/billing.svg';
import { ReactComponent as CourseIcon } from 'assets/icons/course.svg';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import { ReactComponent as EducationIcon } from 'assets/icons/education.svg';
import { ReactComponent as HomeIcon } from 'assets/icons/home.svg';
import { ReactComponent as Interview } from 'assets/icons/interview.svg';
import { ReactComponent as LeftArrow } from 'assets/icons/left-arrow.svg';
import { ReactComponent as MentorsIcon } from 'assets/icons/mentors.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as SettingsIcon } from 'assets/icons/settings.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/trash-can-solid.svg';
import { ReactComponent as UamIcon } from 'assets/icons/uam.svg';
import { FC, IconName, SVGProps } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';

import styles from './styles.module.scss';

const iconNameToIcon: Record<IconName, FC<SVGProps<SVGSVGElement>>> = {
  edit: EditIcon,
  home: HomeIcon,
  course: CourseIcon,
  mentors: MentorsIcon,
  education: EducationIcon,
  billing: BillingIcon,
  settings: SettingsIcon,
  cross: CrossIcon,
  delete: DeleteIcon,
  search: SearchIcon,
  leftArrow: LeftArrow,
  interview: Interview,
  uam: UamIcon,
};

type Props = {
  name: IconName;
  className?: string;
};

const Icon: FC<Props> = ({ name, className }) => {
  const SelectedIcon = iconNameToIcon[name];

  return <SelectedIcon className={getValidClasses(styles.icon, className)} />;
};

export { Icon };
