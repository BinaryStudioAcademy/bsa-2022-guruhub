import { CourseCategoryPriceGetAllItemResponseDto } from '../types';

type CourseCategoryWithPriceDto = {
  id: number;
  key: string;
  name: string;
  price: CourseCategoryPriceGetAllItemResponseDto;
};

export { type CourseCategoryWithPriceDto };
