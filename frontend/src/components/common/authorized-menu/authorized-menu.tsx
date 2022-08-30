import { FC, UserWithPermissions } from 'common/types/types';

import { routes } from './common';
import { BecomeAMentor, NavigationMenu } from './components/components';
import styles from './styles.module.scss';

type Props = {
  user: UserWithPermissions;
  onBecomeAMentor: () => void;
  isMentorBecomingEnabled: boolean;
};

const AuthorizedMenu: FC<Props> = ({
  user,
  onBecomeAMentor,
  isMentorBecomingEnabled,
}) => {
  return (
    <div className={styles.menu}>
      {routes.map(({ name, subroutes }, index) => (
        <NavigationMenu
          key={name}
          name={name}
          subroutes={subroutes}
          className={index < routes.length - 1 ? styles.bottomLine : ''}
          user={user}
        />
      ))}
      {isMentorBecomingEnabled && <BecomeAMentor onClick={onBecomeAMentor} />}
    </div>
  );
};

export { AuthorizedMenu };
