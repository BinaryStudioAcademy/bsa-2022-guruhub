import { AppRoute } from 'common/enums/enums';
import { FC, TaskWithModuleResponseDto } from 'common/types/types';
import { Link } from 'components/common/common';

import { ModuleCard } from './components/components';
import styles from './styles.module.scss';

type Props = {
  tasks: TaskWithModuleResponseDto[];
  studentId: number;
  courseId: number;
};

const ModulesCardsContainer: FC<Props> = ({ tasks, studentId, courseId }) => {
  return (
    <ul className={styles.container}>
      {tasks.map(({ module, id }) => {
        return (
          <li key={id} className={styles.moduleCardContainer}>
            <Link
              to={
                `${AppRoute.STUDENTS}/${studentId}${AppRoute.COURSES}/${courseId}${AppRoute.MODULES}/${module.id}` as AppRoute
              }
              className={styles.linkToModule}
            >
              <ModuleCard
                title={module.title}
                description={module.description}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export { ModulesCardsContainer };
