import { CourseGetResponseDto } from 'guruhub-shared';

import { VendorExpected } from '../vendors/vendors';

type CourseCreateExpected = Pick<
  CourseGetResponseDto,
  'category' | 'description' | 'title'
> & {
  vendor: VendorExpected;
};

export { type CourseCreateExpected };
