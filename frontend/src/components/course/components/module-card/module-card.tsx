import { FC } from 'common/types/types';

import styles from './styles.module.scss';

type Props = {
  abc: string;
};

const ModuleCard: FC<Props> = ({ abc }) => {
  return <div className={styles.card}>{abc}</div>;
};

export { ModuleCard };
