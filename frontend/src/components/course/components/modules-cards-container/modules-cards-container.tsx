import { AppRoute } from 'common/enums/enums';
import {
  CourseGetResponseDto,
  CourseModulesGetAllItemResponseDto,
  FC,
  TaskWithModuleResponseDto,
} from 'common/types/types';
import { Link } from 'components/common/common';
import { generateDynamicPath } from 'helpers/helpers';

import { ModuleCard } from './components/components';
import { getTaskForModule } from './helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  isMentorView: boolean;
  studentId: number;
  modules: CourseModulesGetAllItemResponseDto[];
  tasks: TaskWithModuleResponseDto[];
  course: CourseGetResponseDto;
};

const ModulesCardsContainer: FC<Props> = ({
  isMentorView,
  studentId,
  modules,
  tasks,
  course,
}) => {
  return (
    <ul className={styles.container}>
      {modules.map((courseModule) => {
        const linkTo = isMentorView
          ? generateDynamicPath(AppRoute.STUDENTS_$ID_COURSES_$ID_MODULES_$ID, {
              studentId,
              courseId: course.id,
              moduleId: courseModule.id,
            })
          : generateDynamicPath(AppRoute.COURSES_$ID_MODULES_$ID, {
              courseId: course.id,
              moduleId: courseModule.id,
            });

        const task = isMentorView
          ? getTaskForModule({ moduleId: courseModule.id, tasks })
          : null;

        const status = task?.status ?? null;

        return (
          <li key={courseModule.id} className={styles.moduleCardContainer}>
            <Link to={linkTo as AppRoute} className={styles.linkToModule}>
              <ModuleCard title={courseModule.title} status={status} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export { ModulesCardsContainer };
