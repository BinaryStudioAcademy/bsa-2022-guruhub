import { FC, SubNavigationMenuItem } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';
import { useMatch, useResolvedPath } from 'hooks/hooks';

import { NavigationMenuItem } from './navigation-menu-item/navigation-menu-item';
import styles from './styles.module.scss';

type Props = {
  name: string;
  subroutes: SubNavigationMenuItem[];
};

const NavigationMenu: FC<Props> = ({ name, subroutes }) => {
  return (
    <div>
      <h4 className={styles.title}>{name}</h4>
      <div className={getValidClasses(styles.links, styles.bottomLine)}>
        {subroutes.map(({ name: routeName, iconName, href }) => {
          const resolvedPath = useResolvedPath(href);
          const isCurrentRoute = useMatch({
            path: resolvedPath.pathname,
            end: true,
          });

          return (
            <NavigationMenuItem
              href={href}
              iconName={iconName}
              isCurrentRoute={isCurrentRoute}
              routeName={routeName}
            />
          );
        })}
      </div>
    </div>
  );
};

export { NavigationMenu };
