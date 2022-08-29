import { AppRoute } from 'common/enums/enums';
import { FC, IconName } from 'common/types/types';
import { Icon, Link } from 'components/common/common';
import { getValidClasses } from 'helpers/helpers';
import { useMatch, useResolvedPath } from 'hooks/hooks';

import styles from './styles.module.scss';

type Props = {
  href: AppRoute;
  iconName: IconName;
  routeName: string;
};

const NavigationMenuItem: FC<Props> = ({ href, iconName, routeName }) => {
  const resolvedPath = useResolvedPath(href);
  const isCurrentRoute = Boolean(
    useMatch({
      path: resolvedPath.pathname,
      end: true,
    }),
  );

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
