import { CourseUpdateMentoringDto } from '~/common/types/types';

type CourseUpdateMentoringForm = Pick<CourseUpdateMentoringDto, 'courseId'> & {
  studentsCount: string;
};

export { type CourseUpdateMentoringForm };
