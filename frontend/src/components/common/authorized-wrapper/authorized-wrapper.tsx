import { FC } from 'common/types/types';
import { useAppSelector } from 'hooks/hooks';

import { AuthorizedMenu, Header } from '../common';
import styles from './styles.module.scss';

const AuthorizedWrapper: FC = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth);
  const hasUser = Boolean(user);

  if (!hasUser) {
    return (
      <>
        <Header />
        <div className={styles.content}>
          <div className={styles.mainContent}>{children}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className={styles.content}>
        <AuthorizedMenu />
        <div className={styles.mainContent}>{children}</div>
      </div>
    </>
  );
};

export { AuthorizedWrapper };
