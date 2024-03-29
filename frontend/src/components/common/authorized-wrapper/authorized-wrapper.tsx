import { FC, UserWithPermissions } from 'common/types/types';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { courseActions } from 'store/actions';

import { AuthorizedMenu, Header } from '../common';
import styles from './styles.module.scss';

const AuthorizedWrapper: FC = ({ children }) => {
  const { user, isMentorBecomingEnabled } = useAppSelector(
    ({ auth, course }) => ({
      user: auth.user,
      isMentorBecomingEnabled: course.isMentorBecomingEnabled,
    }),
  );
  const dispatch = useAppDispatch();
  const hasUser = Boolean(user);

  const handleBecomeAMentor = (): void => {
    dispatch(courseActions.becomeAMentor());
  };

  return (
    <>
      <Header />
      <div className={styles.content}>
        {hasUser && (
          <AuthorizedMenu
            user={user as UserWithPermissions}
            onBecomeAMentor={handleBecomeAMentor}
            isMentorBecomingEnabled={isMentorBecomingEnabled}
          />
        )}
        <div className={styles.mainContent}>{children}</div>
      </div>
    </>
  );
};

export { AuthorizedWrapper };
