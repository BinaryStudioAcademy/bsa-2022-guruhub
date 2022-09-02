import { VendorKey } from '~/common/enums/enums';

type CourseCreateArgumentsDto = {
  title: string;
  description: string;
  url: string;
  vendorKey: VendorKey;
  originalId: string;
  imageUrl: string | null;
};

export { type CourseCreateArgumentsDto };
