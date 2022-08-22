import { SettingsWrapperType } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  iconColorClass: string;
  name: string;
  isCurrentRoute: boolean;
  tab: SettingsWrapperType;
  onHandleChangeTab: (tab: SettingsWrapperType) => void;
};

const SettingsMenuItem: FC<Props> = ({
  iconColorClass,
  name,
  tab,
  isCurrentRoute,
  onHandleChangeTab,
}) => {
  const handleChangeTab = (): void => {
    onHandleChangeTab(tab);
  };

  return (
    <div onClick={handleChangeTab}>
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
    </div>
  );
};

export { SettingsMenuItem };
