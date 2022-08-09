import { FC } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';
import { useLocation } from 'hooks/hooks';
import { Link } from 'components/common/common';
import { routes } from './common';
import styles from './styles.module.scss';

const AuthedMenu: FC = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.menu}>
      {routes.map(({ name, subroutes }) => (
        <div key={name}>
          <h4 className={styles.title}>{name}</h4>
          <div className={getValidClasses(styles.links, styles.bottomLine)}>
            {subroutes.map(({ name: routeName, Icon, href }) => {
              const isCurrentRoute = pathname === href;

              return (
                <Link to={href} key={href}>
                  <span
                    className={getValidClasses(
                      styles.link,
                      isCurrentRoute && styles.linkSelected,
                    )}
                  >
                    <Icon
                      className={getValidClasses(
                        styles.icon,
                        isCurrentRoute && styles.iconSelected,
                      )}
                    />{' '}
                    {routeName}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export { AuthedMenu };
