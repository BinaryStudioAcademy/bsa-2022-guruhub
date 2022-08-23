import { AppRoute } from 'common/enums/enums';
import { CourseModulesGetAllItemResponseDto, FC } from 'common/types/types';
import { Link } from 'components/common/common';
import { useAppSelector } from 'hooks/hooks';

import { ModuleCard } from './components/module-card/module-card';
import styles from './styles.module.scss';

type Props = {
  modules: CourseModulesGetAllItemResponseDto[];
};

const ModulesCardsContainer: FC<Props> = ({ modules }) => {
  const { course } = useAppSelector((state) => state.course);

  return (
    <ul className={styles.container}>
      {modules.map((courseModule) => {
        return (
          <Link
            to={
              `${AppRoute.COURSES}/${course?.id}/modules/${courseModule.id}` as AppRoute
            }
            className={styles.linkToModule}
          >
            <li key={courseModule.id} className={styles.moduleCardContainer}>
              <ModuleCard
                title={courseModule.title}
                description={courseModule.description}
              />
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export { ModulesCardsContainer };
