import { AppRoute } from 'common/enums/enums';
import {
  CourseGetResponseDto,
  CourseModulesGetAllItemResponseDto,
  FC,
  TaskWithModuleResponseDto,
} from 'common/types/types';
import { Link } from 'components/common/common';

import { ModuleCard } from './components/components';
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
  if (isMentorView) {
    return (
      <ul className={styles.container}>
        {tasks.map(({ id, status, module }) => {
          return (
            <li key={id} className={styles.moduleCardContainer}>
              <Link
                to={
                  `${AppRoute.STUDENTS}/${studentId}${AppRoute.COURSES}/${
                    (course as CourseGetResponseDto).id
                  }${AppRoute.MODULES}/${module.id}` as AppRoute
                }
                className={styles.linkToModule}
              >
                <ModuleCard
                  title={module.title}
                  description={module.description}
                  status={status}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className={styles.container}>
      {modules.map((courseModule) => {
        const linkTo = isMentorView
          ? `${AppRoute.STUDENTS}/${studentId}${AppRoute.COURSES}/${
              (course as CourseGetResponseDto).id
            }${AppRoute.MODULES}/${courseModule.id}`
          : `${AppRoute.COURSES}/${course?.id}/modules/${courseModule.id}`;

        return (
          <li key={courseModule.id} className={styles.moduleCardContainer}>
            <Link to={linkTo as AppRoute} className={styles.linkToModule}>
              <ModuleCard
                title={courseModule.title}
                description={courseModule.description}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export { ModulesCardsContainer };
