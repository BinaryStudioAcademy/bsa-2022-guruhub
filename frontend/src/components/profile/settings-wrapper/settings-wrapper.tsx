import { FC } from 'common/types/types';

import { settingsTabs } from './common';
import { SettingsMenuItem } from './components/settings-menu-item/settings-menu-item';
import styles from './styles.module.scss';

type Props = {
  selectedTab: string;
  onHandleChangeTab: (tab: string) => void;
};
const SettingsWrapper: FC<Props> = ({ selectedTab, onHandleChangeTab }) => {
  return (
    <div className={styles.menu}>
      <div className={styles.title}>Settings</div>
      <div className={styles.links}>
        {settingsTabs.map(({ name, iconColorClass }) => {
          return (
            <SettingsMenuItem
              iconColorClass={iconColorClass}
              key={name}
              name={name}
              isCurrentRoute={selectedTab === name}
              onHandleChangeTab={onHandleChangeTab}
            />
          );
        })}
      </div>
    </div>
  );
};

export { SettingsWrapper };
