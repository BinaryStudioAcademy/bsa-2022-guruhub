import { FC } from 'common/types/types';

import { routes } from './common';
import { NavigationMenu } from './components/components';
import styles from './styles.module.scss';

const AuthorizedMenu: FC = () => {
  return (
    <div className={styles.menu}>
      {routes.map(({ name, subroutes }) => (
        <NavigationMenu key={name} name={name} subroutes={subroutes} />
      ))}
    </div>
  );
};

export { AuthorizedMenu };
