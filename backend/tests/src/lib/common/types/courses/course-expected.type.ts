import { CourseGetResponseDto } from 'guruhub-shared';

import { VendorExpected } from '../types';

type CourseExpected = Pick<
  CourseGetResponseDto,
  'id' | 'category' | 'description' | 'title'
> & {
  vendor: VendorExpected;
};

export { type CourseExpected };
