import { ReactComponent as BillingIcon } from 'assets/icons/billing.svg';
import { ReactComponent as CIcon } from 'assets/icons/c.svg';
import { ReactComponent as CourseIcon } from 'assets/icons/course.svg';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { ReactComponent as EducationIcon } from 'assets/icons/education.svg';
import { ReactComponent as HomeIcon } from 'assets/icons/home.svg';
import { ReactComponent as JavaIcon } from 'assets/icons/java.svg';
import { ReactComponent as MentorsIcon } from 'assets/icons/mentors.svg';
import { ReactComponent as NodeJSIcon } from 'assets/icons/nodejs.svg';
import { ReactComponent as PythonIcon } from 'assets/icons/python.svg';
import { ReactComponent as SettingsIcon } from 'assets/icons/settings.svg';
import { ReactComponent as TypeScriptIcon } from 'assets/icons/typescript.svg';
import { FC, IconName, SVGProps } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';

import styles from './styles.module.scss';

const iconNameToIcon: Record<IconName, FC<SVGProps<SVGSVGElement>>> = {
  home: HomeIcon,
  course: CourseIcon,
  mentors: MentorsIcon,
  education: EducationIcon,
  billing: BillingIcon,
  settings: SettingsIcon,
  cross: CrossIcon,
  c: CIcon,
  typescript: TypeScriptIcon,
  java: JavaIcon,
  nodejs: NodeJSIcon,
  python: PythonIcon,
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
