import { FC } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  iconColorClass: string;
  name: string;
  isCurrentRoute: boolean;
  onHandleChangeTab: (tab: string) => void;
};

const SettingsMenuItem: FC<Props> = ({
  iconColorClass,
  name,
  isCurrentRoute,
  onHandleChangeTab,
}) => {
  const handleChangeTab = (): void => {
    onHandleChangeTab(name);
  };

  return (
    <div key={name} onClick={handleChangeTab}>
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
            styles.link,
            isCurrentRoute && styles.linkSelected,
          )}
        >
          {name}
        </span>
      </div>
    </div>
  );
};

export { SettingsMenuItem };
