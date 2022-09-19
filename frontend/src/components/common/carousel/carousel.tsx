import 'react-multi-carousel/lib/styles.css';
import './styles.scss';

import { FC, ResponsiveType } from 'common/types/types';
import MultiCarousel from 'react-multi-carousel';

type Props = {
  responsive: ResponsiveType;
};

const Carousel: FC<Props> = ({ children, responsive }) => {
  return (
    <MultiCarousel arrows responsive={responsive}>
      {children}
    </MultiCarousel>
  );
};

export { Carousel };
