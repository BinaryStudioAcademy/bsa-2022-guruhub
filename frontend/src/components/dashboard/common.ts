import { CarouselResponsiveType } from 'common/types/types';

const carouselResponsiveBreakpoints: CarouselResponsiveType = {
  desktop3XLarge: {
    breakpoint: { max: 2870, min: 2560 },
    items: 7,
  },
  desktop2XLarge: {
    breakpoint: { max: 2560, min: 2250 },
    items: 6,
  },
  desktopXLarge: {
    breakpoint: { max: 2250, min: 1940 },
    items: 5,
  },
  desktopLarge: {
    breakpoint: { max: 1940, min: 1630 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1630, min: 1320 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1320, min: 1010 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 1010, min: 0 },
    items: 1,
  },
};

export { carouselResponsiveBreakpoints };
