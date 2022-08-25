import { FC } from 'common/types/types';
import { useMatch, useResolvedPath } from 'hooks/hooks';

import { settingsTabs } from './common';
import { SettingsMenuItem } from './components/settings-menu-item/settings-menu-item';
import styles from './styles.module.scss';

const SettingsWrapper: FC = () => {
  return (
    <div className={styles.menu}>
      <h1 className={styles.title}>Settings</h1>
      <div className={styles.links}>
        {settingsTabs.map(({ name, href, iconColorClass }) => {
          const resolvedPath = useResolvedPath(href);
          const isCurrentRoute = Boolean(
            useMatch({
              path: resolvedPath.pathname,
              end: true,
            }),
          );

          return (
            <SettingsMenuItem
              iconColorClass={iconColorClass}
              key={name}
              name={name}
              href={href}
              isCurrentRoute={isCurrentRoute}
            />
          );
        })}
      </div>
    </div>
  );
};

export { SettingsWrapper };
