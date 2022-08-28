import {
  FC,
  SubNavigationMenuItem,
  UserWithPermissions,
} from 'common/types/types';

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

  return (
    <div className={className}>
      <h4 className={styles.title}>{name}</h4>
      <div className={styles.links}>
        {permittedSubroutes.map(({ name: routeName, iconName, href }) => {
          return (
            <NavigationMenuItem
              href={href}
              iconName={iconName}
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
