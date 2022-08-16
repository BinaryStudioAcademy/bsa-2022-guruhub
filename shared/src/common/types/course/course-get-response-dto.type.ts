import { VendorKey } from '~/common/enums/enums';

type CourseGetResponseDto = {
  id: number;
  title: string;
  description: string;
  url: string;
  vendorKey: VendorKey;
};

export { type CourseGetResponseDto };
