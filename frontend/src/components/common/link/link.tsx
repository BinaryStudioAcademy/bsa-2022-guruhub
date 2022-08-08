import { FC } from 'common/types/types';
import { NavLink } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';
import styles from './link.module.scss';

type Props = {
  to: AppRoute;
};

const Link: FC<Props> = ({ children, to }) => (
  <NavLink to={to} className={styles.link}>
    {children}
  </NavLink>
);

export { Link };
