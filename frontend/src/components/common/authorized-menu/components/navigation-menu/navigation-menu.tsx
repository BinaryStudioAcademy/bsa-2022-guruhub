import {
  FC,
  SubNavigationMenuItem,
  UserWithPermissions,
} from 'common/types/types';
import { areTheSamePaths } from 'helpers/helpers';
import { useLocation } from 'hooks/hooks';

import { NavigationMenuItem } from './components/components';
import { getPermittedSubroutes } from './helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  name: string;
  subroutes: SubNavigationMenuItem[];
  user: UserWithPermissions;
  className?: string;
};

const NavigationMenu: FC<Props> = ({ name, subroutes, className, user }) => {
  const permittedSubroutes = getPermittedSubroutes(subroutes, user);
  const { pathname } = useLocation();

  return (
    <div className={className}>
      <h4 className={styles.title}>{name}</h4>
      <div className={styles.links}>
        {permittedSubroutes.map(({ name: routeName, iconName, href }) => {
          const isCurrentRoute = areTheSamePaths(pathname, href);

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
