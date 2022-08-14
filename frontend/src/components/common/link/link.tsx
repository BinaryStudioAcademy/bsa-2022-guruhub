import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';
import { NavLink } from 'react-router-dom';

import styles from './styles.module.scss';

type Props = {
  to: AppRoute;
  className?: string;
};

const Link: FC<Props> = ({ children, to, className }) => (
  <NavLink to={to} className={getValidClasses(className ?? styles.link)}>
    {children}
  </NavLink>
);

export { Link };
