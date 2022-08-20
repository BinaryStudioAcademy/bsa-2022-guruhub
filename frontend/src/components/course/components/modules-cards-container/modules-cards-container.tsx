import { CourseModulesGetAllItemResponseDto, FC } from 'common/types/types';

import { ModuleCard } from '../module-card/module-card';
import styles from './styles.module.scss';

type Props = {
  modules: CourseModulesGetAllItemResponseDto[];
};

const ModulesCardsContainer: FC<Props> = ({ modules }) => {
  let initialModuleCardNumber = 0;

  return (
    <div className={styles.container}>
      {modules.map((courseModule) => {
        initialModuleCardNumber++;

        return (
          <ModuleCard
            key={courseModule.id}
            orderNumber={initialModuleCardNumber}
            title={courseModule.title}
            description={courseModule.description}
          />
        );
      })}
    </div>
  );
};

export { ModulesCardsContainer };
