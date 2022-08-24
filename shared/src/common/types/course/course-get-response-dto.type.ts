import { VendorGetResponseDto } from '~/common/types/types';

type CourseGetResponseDto = {
  id: number;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  vendor: VendorGetResponseDto;
  courseCategoryId: number;
};

export { type CourseGetResponseDto };
