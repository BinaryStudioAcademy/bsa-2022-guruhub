import { AppRoute } from 'common/enums/enums';
import { CourseModulesGetAllItemResponseDto, FC } from 'common/types/types';
import { Link } from 'components/common/common';

import { ModuleCard } from './components/components';
import styles from './styles.module.scss';

type Props = {
  modules: CourseModulesGetAllItemResponseDto[];
  studentId: number;
  courseId: number;
};

const ModulesCardsContainer: FC<Props> = ({ modules, studentId, courseId }) => {
  return (
    <ul className={styles.container}>
      {modules.map((courseModule) => {
        return (
          <li key={courseModule.id} className={styles.moduleCardContainer}>
            <Link
              to={
                `${AppRoute.STUDENTS}/${studentId}${AppRoute.COURSES}/${courseId}${AppRoute.MODULES}/${courseModule.id}` as AppRoute
              }
              className={styles.linkToModule}
            >
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
