import { SettingsWrapperType } from 'common/enums/enums';
import { FC } from 'common/types/types';

import { settingsTabs } from './common';
import { SettingsMenuItem } from './components/settings-menu-item/settings-menu-item';
import styles from './styles.module.scss';

type Props = {
  selectedTab: number;
  onHandleChangeTab: (tab: SettingsWrapperType) => void;
};
const SettingsWrapper: FC<Props> = ({ selectedTab, onHandleChangeTab }) => {
  return (
    <div className={styles.menu}>
      <div className={styles.title}>Settings</div>
      <div className={styles.links}>
        {settingsTabs.map(({ name, key, iconColorClass }) => {
          return (
            <SettingsMenuItem
              iconColorClass={iconColorClass}
              keyItem={key}
              name={name}
              isCurrentRoute={selectedTab === key}
              onHandleChangeTab={onHandleChangeTab}
            />
          );
        })}
      </div>
    </div>
  );
};

export { SettingsWrapper };
