import { VendorGetResponseDto } from '~/common/types/types';

type CourseGetResponseDto = {
  id: number;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  courseCategoryId: number | null;
  vendor: VendorGetResponseDto;
};

export { type CourseGetResponseDto };
