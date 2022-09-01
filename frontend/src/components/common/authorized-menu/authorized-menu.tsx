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
      <div>
        {routes.map(({ name, subroutes }) => (
          <NavigationMenu
            key={name}
            name={name}
            subroutes={subroutes}
            className={styles.bottomLine}
            user={user}
          />
        ))}
      </div>
      {isMentorBecomingEnabled && <BecomeAMentor onClick={onBecomeAMentor} />}
    </div>
  );
};

export { AuthorizedMenu };
