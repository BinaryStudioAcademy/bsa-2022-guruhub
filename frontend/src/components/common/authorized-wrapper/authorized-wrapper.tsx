import { FC } from 'common/types/types';
import { Header } from '../common';

const AuthorizedWrapper: FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export { AuthorizedWrapper };
