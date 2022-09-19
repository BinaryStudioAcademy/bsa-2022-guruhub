import 'react-multi-carousel/lib/styles.css';
import './styles.scss';

import { CarouselResponsiveBreakpoints, FC } from 'common/types/types';
import MultiCarousel from 'react-multi-carousel';

type Props = {
  responsive: CarouselResponsiveBreakpoints;
};

const Carousel: FC<Props> = ({ children, responsive }) => {
  return (
    <MultiCarousel arrows responsive={responsive}>
      {children}
    </MultiCarousel>
  );
};

export { Carousel };
