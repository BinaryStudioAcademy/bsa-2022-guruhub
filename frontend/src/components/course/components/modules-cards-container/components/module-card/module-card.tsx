import { StringCase, TaskStatus } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Content } from 'components/common/common';
import { changeStringCase, getValidClasses } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  title: string;
  description: string | null;
  status?: TaskStatus;
};

const ModuleCard: FC<Props> = ({ title, description, status }) => {
  const camelCaseStatus =
    status &&
    changeStringCase({
      caseType: StringCase.CAMEL_CASE,
      stringToChange: status,
    });

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.title}>
          <p className={styles.header}>{title}</p>
        </div>
        {!status && (
          <div className={styles.description}>
            {description && <Content html={description} />}
          </div>
        )}
      </div>
      {status && (
        <div>
          <p
            className={getValidClasses(
              styles.status,
              styles[camelCaseStatus as string],
            )}
          >
            {status}
          </p>
        </div>
      )}
    </div>
  );
};

export { ModuleCard };
