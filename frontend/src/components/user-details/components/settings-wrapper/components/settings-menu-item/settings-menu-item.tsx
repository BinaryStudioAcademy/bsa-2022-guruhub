import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Link } from 'components/common/common';
import { getValidClasses } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  iconColorClass: string;
  name: string;
  isCurrentRoute: boolean;
  href: AppRoute;
};

const SettingsMenuItem: FC<Props> = ({
  iconColorClass,
  name,
  href,
  isCurrentRoute,
}) => {
  return (
    <Link to={href}>
      <div
        className={getValidClasses(
          styles.link,
          isCurrentRoute && styles.linkSelected,
        )}
      >
        <div
          className={getValidClasses(
            iconColorClass && styles[iconColorClass],
            styles.outerCircle,
            isCurrentRoute && styles.circleSelected,
          )}
        />
        <span
          className={getValidClasses(
            styles.text,
            isCurrentRoute && styles.linkSelected,
          )}
        >
          {name}
        </span>
      </div>
    </Link>
  );
};

export { SettingsMenuItem };
