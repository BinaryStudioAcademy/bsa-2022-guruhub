import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { IconButton } from 'components/common/common';
import { useParams } from 'hooks/hooks';

import styles from './styles.module.scss';

const Module: FC = () => {
  const { courseId } = useParams();

  return (
    <div className={styles.container}>
      <div className={styles.buttonWrapper}>
        <IconButton
          label="back"
          iconName="leftArrow"
          to={`${AppRoute.COURSES}/${courseId}` as AppRoute}
          iconColor="blue"
        />
      </div>
      <h1 className={styles.courseName}>Course name</h1>
      <div className={styles.moduleNameContainer}>
        <div className={styles.moduleNameContent}>
          <ol className={styles.list}>
            <li value="5" className={styles.moduleName}>
              Module name
            </li>
          </ol>
          <p className={styles.moduleDescription}>Module description</p>
        </div>
      </div>
      <ol className={styles.list}>
        {[1, 2, 3, 4, 5].map((i) => (
          <li key={i} className={styles.lecture}>
            Ullamco cupidatat ad irure fugiat culpa amet eu nisi voluptate
            deserunt voluptate. Et reprehenderit ipsum eu officia. Id cupidatat
            magna ex elit ea nisi consectetur sunt eiusmod dolor.
          </li>
        ))}
      </ol>
    </div>
  );
};

export { Module };
