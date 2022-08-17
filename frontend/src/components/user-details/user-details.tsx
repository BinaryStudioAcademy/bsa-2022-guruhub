import { SettingsWrapperType } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { useState } from 'hooks/hooks';

import { SettingsWrapper } from './settings-wrapper/settings-wrapper';
import styles from './styles.module.scss';
import { UserProfile } from './user-profile/user-profile';

const UserDetails: FC = () => {
  const [tab, setTab] = useState<number>(
    SettingsWrapperType.PERSONAL_INFORMATION,
  );

  const handleChangeTab = (tab: SettingsWrapperType): void => {
    setTab(tab);
  };

  return (
    <div className={styles.grid}>
      <SettingsWrapper selectedTab={tab} onHandleChangeTab={handleChangeTab} />
      {tab === SettingsWrapperType.PERSONAL_INFORMATION && <UserProfile />}
    </div>
  );
};

export { UserDetails };
