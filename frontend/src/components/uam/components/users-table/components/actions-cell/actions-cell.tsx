import { Icon } from 'components/common/common';

import styles from './styles.module.scss';

const Actions = (
  id: string,
  onWorkerDelete: (id: string) => void,
): JSX.Element => {
  const handleDelete = (): void => {
    onWorkerDelete(id);
  };

  return (
    <div onClick={handleDelete}>
      <Icon name={'delete'} className={styles.deleteIcon} />
    </div>
  );
};

export { Actions };
