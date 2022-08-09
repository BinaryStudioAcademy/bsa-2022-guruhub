import { FC } from 'common/types/types';

import { AuthorizedMenu, Header } from '../common';

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
