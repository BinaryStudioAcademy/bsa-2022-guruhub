import { AppRoute } from 'common/enums/enums';
import { FC, IconName, PathMatch } from 'common/types/types';
import { Icon, Link } from 'components/common/common';
import { getValidClasses } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  href: AppRoute;
  isCurrentRoute: PathMatch<string> | null;
  iconName: IconName;
  routeName: string;
};

const NavigationMenuItem: FC<Props> = ({
  href,
  isCurrentRoute,
  iconName,
  routeName,
}) => {
  return (
    <Link to={href}>
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
};

export { NavigationMenuItem };
