import { SettingsWrapperType } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  iconColorClass: string;
  keyItem: SettingsWrapperType;
  name: string;
  isCurrentRoute: boolean;
  onHandleChangeTab: (tab: SettingsWrapperType) => void;
};

const SettingsMenuItem: FC<Props> = ({
  iconColorClass,
  name,
  keyItem,
  isCurrentRoute,
  onHandleChangeTab,
}) => {
  const handleChangeTab = (): void => {
    onHandleChangeTab(keyItem);
  };

  return (
    <div key={keyItem} onClick={handleChangeTab}>
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
