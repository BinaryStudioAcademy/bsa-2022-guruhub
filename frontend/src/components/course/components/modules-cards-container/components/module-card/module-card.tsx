import { StringCase, TaskStatus } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { changeStringCase, getValidClasses } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  title: string;
  status: TaskStatus | null;
};

const ModuleCard: FC<Props> = ({ title, status }) => {
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
      </div>
      {status && (
        <div>
          <p
            className={getValidClasses(
              styles.status,
              camelCaseStatus && styles[camelCaseStatus],
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
