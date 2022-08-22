import { SettingsWrapperType } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { useState } from 'hooks/hooks';

import { SettingsWrapper, UserProfile } from './components/components';
import styles from './styles.module.scss';

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
