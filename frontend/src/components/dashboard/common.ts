import { ResponsiveType } from 'common/types/types';

const carouselResponsiveBreakpoints: ResponsiveType = {
  desktop: {
    breakpoint: { max: 3000, min: 1480 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1480, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

export { carouselResponsiveBreakpoints };
