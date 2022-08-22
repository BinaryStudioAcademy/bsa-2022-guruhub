import { FC } from 'common/types/types';
import { useAppSelector } from 'hooks/hooks';

import { routes } from './common';
import { NavigationMenu } from './components/components';
import styles from './styles.module.scss';

const AuthorizedMenu: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const hasUser = Boolean(user);

  if (!hasUser) {
    return <></>;
  }

  return (
    <div className={styles.menu}>
      {routes.map(({ name, subroutes }) => (
        <NavigationMenu
          key={name}
          name={name}
          subroutes={subroutes}
          className={styles.bottomLine}
        />
      ))}
    </div>
  );
};

export { AuthorizedMenu };
