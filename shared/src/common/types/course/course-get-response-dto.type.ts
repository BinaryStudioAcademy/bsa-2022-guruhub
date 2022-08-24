import {
  CategoryGetAllItemResponseDto,
  VendorGetResponseDto,
} from '~/common/types/types';

type CourseGetResponseDto = {
  id: number;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  courseCategory: CategoryGetAllItemResponseDto | null;
  vendor: VendorGetResponseDto;
};

export { type CourseGetResponseDto };
