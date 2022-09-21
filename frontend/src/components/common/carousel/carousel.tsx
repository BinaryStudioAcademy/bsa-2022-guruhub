import 'react-multi-carousel/lib/styles.css';
import './styles.scss';

import { CarouselResponsiveType, FC } from 'common/types/types';
import MultiCarousel from 'react-multi-carousel';

type Props = {
  responsive: CarouselResponsiveType;
  hasArrows?: boolean;
};

const Carousel: FC<Props> = ({ children, responsive, hasArrows = false }) => {
  return (
    <MultiCarousel arrows={hasArrows} responsive={responsive}>
      {children}
    </MultiCarousel>
  );
};

export { Carousel };
