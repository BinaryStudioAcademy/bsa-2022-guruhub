import {
  UdemyCourseGetResponseDto,
  UdemyModulesGetResponseDto,
} from 'guruhub-shared';

type UdemyCourseInfo = {
  id: number;
  course: UdemyCourseGetResponseDto;
  modules: UdemyModulesGetResponseDto;
};

export { UdemyCourseInfo };
