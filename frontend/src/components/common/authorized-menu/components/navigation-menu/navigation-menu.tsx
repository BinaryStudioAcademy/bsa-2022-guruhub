import { FC, SubNavigationMenuItem } from 'common/types/types';
import { useMatch, useResolvedPath } from 'hooks/hooks';

import { NavigationMenuItem } from './components/components';
import styles from './styles.module.scss';

type Props = {
  name: string;
  subroutes: SubNavigationMenuItem[];
  className?: string;
};

const NavigationMenu: FC<Props> = ({ name, subroutes, className }) => {
  return (
    <div className={className}>
      <h4 className={styles.title}>{name}</h4>
      <div className={styles.links}>
        {subroutes.map(({ name: routeName, iconName, href }) => {
          const resolvedPath = useResolvedPath(href);
          const isCurrentRoute = Boolean(
            useMatch({
              path: resolvedPath.pathname,
              end: true,
            }),
          );

          return (
            <NavigationMenuItem
              href={href}
              iconName={iconName}
              isCurrentRoute={isCurrentRoute}
              routeName={routeName}
              key={href}
            />
          );
        })}
      </div>
    </div>
  );
};

export { NavigationMenu };
