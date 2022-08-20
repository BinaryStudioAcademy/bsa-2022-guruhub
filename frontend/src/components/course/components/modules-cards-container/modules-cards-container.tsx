import { CourseModulesGetAllItemResponseDto, FC } from 'common/types/types';

import { ModuleCard } from '../module-card/module-card';
import styles from './styles.module.scss';

type Props = {
  modules: CourseModulesGetAllItemResponseDto[];
};

const ModulesCardsContainer: FC<Props> = ({ modules }) => {
  return (
    <div className={styles.container}>
      {modules.map((courseModule) => (
        <ModuleCard
          title={courseModule.title}
          description={courseModule.description}
        />
      ))}
    </div>
  );
};

export { ModulesCardsContainer };
