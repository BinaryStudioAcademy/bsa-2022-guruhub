import { CourseModulesGetAllItemResponseDto } from 'guruhub-shared';

type ModuleCreateExpected = Pick<
  CourseModulesGetAllItemResponseDto,
  'courseId' | 'title' | 'description'
>;

export { ModuleCreateExpected };
