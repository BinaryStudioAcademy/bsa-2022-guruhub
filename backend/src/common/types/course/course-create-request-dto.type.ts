import { VendorKey } from '~/common/enums/enums';

type CourseCreateRequestDto = {
  title: string;
  description: string;
  url: string;
  vendorKey: VendorKey;
};

export { type CourseCreateRequestDto };
