import { FC } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';
import { useMatch, useResolvedPath } from 'hooks/hooks';
import { Link } from 'components/common/common';
import { routes } from './common';
import styles from './styles.module.scss';
import { Icon } from '../icon/icon';

const AuthorizedMenu: FC = () => {
  return (
    <div className={styles.menu}>
      {routes.map(({ name, subroutes }) => (
        <div key={name}>
          <h4 className={styles.title}>{name}</h4>
          <div className={getValidClasses(styles.links, styles.bottomLine)}>
            {subroutes.map(({ name: routeName, iconName, href }) => {
              const resolvedPath = useResolvedPath(href);
              const isCurrentRoute = useMatch({
                path: resolvedPath.pathname,
                end: true,
              });

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
                      name={iconName}
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

export { AuthorizedMenu };
