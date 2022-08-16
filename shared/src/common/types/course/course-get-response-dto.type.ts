import { VendorGetResponseDto } from '~/common/types/types';

type CourseGetResponseDto = {
  id: number;
  title: string;
  description: string;
  url: string;
  vendor: VendorGetResponseDto;
};

export { type CourseGetResponseDto };
