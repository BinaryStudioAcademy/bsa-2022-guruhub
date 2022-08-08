import { FC } from 'common/types/types';
import { Header } from '../common';

const Wrapper: FC = (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export { Wrapper };
