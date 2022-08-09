import { FC } from 'common/types/types';

import { AuthorizedMenu, Header } from '../common';
import styles from './styles.module.scss';

const AuthorizedWrapper: FC = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.content}>
        <AuthorizedMenu />
        {children}
      </div>
    </>
  );
};

export { AuthorizedWrapper };
