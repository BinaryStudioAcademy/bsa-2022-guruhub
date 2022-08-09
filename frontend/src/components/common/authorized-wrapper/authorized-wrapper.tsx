import { FC } from 'common/types/types';
import { Header, AuthorizedMenu } from '../common';

const AuthorizedWrapper: FC = ({ children }) => {
  return (
    <>
      <Header />
      <AuthorizedMenu />
      {children}
    </>
  );
};

export { AuthorizedWrapper };
