import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { NavLink } from 'react-router-dom';

import styles from './styles.module.scss';

type Props = {
  to: AppRoute;
};

const Link: FC<Props> = ({ children, to }) => (
  <NavLink to={to} className={styles.link}>
    {children}
  </NavLink>
);

export { Link };
