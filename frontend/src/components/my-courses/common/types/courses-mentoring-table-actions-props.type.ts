import { CourseUpdateMentoringDto } from 'common/types/types';

type CoursesMentoringTableActionsProps = {
  course: CourseUpdateMentoringDto;
  onEdit: (course: CourseUpdateMentoringDto) => void;
};

export { type CoursesMentoringTableActionsProps };
