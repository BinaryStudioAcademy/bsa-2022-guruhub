import { CourseModulesGetAllItemResponseDto, FC } from 'common/types/types';

import { ModuleCard } from './components/module-card/module-card';
import styles from './styles.module.scss';

type Props = {
  modules: CourseModulesGetAllItemResponseDto[];
};

const ModulesCardsContainer: FC<Props> = ({ modules }) => {
  return (
    <ul className={styles.container}>
      {modules.map((courseModule) => {
        return (
          <li key={courseModule.id} className={styles.moduleCardContainer}>
            <ModuleCard
              title={courseModule.title}
              description={courseModule.description}
            />
          </li>
        );
      })}
    </ul>
  );
};

export { ModulesCardsContainer };
