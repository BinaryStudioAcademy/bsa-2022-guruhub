import { FC, UserWithPermissions } from 'common/types/types';
import { useAppSelector } from 'hooks/hooks';

import { routes } from './common';
import { BecomeAMentor, NavigationMenu } from './components/components';
import styles from './styles.module.scss';

type Props = {
  user: UserWithPermissions;
  onBecomeAMentor: () => void;
};

const AuthorizedMenu: FC<Props> = ({ user, onBecomeAMentor }) => {
  const { isMentorBecomingEnabled } = useAppSelector((state) => state.course);

  return (
    <div className={styles.menu}>
      {routes.map(({ name, subroutes }) => (
        <NavigationMenu
          key={name}
          name={name}
          subroutes={subroutes}
          className={styles.bottomLine}
          user={user}
        />
      ))}
      {isMentorBecomingEnabled && <BecomeAMentor onClick={onBecomeAMentor} />}
    </div>
  );
};

export { AuthorizedMenu };
