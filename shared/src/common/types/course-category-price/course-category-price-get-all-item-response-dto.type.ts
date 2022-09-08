import { CategoryGetAllItemResponseDto } from '../types';

type CourseCategoryPriceGetAllItemResponseDto = {
  id: number;
  category: CategoryGetAllItemResponseDto;
  price: number;
};

export { type CourseCategoryPriceGetAllItemResponseDto };
