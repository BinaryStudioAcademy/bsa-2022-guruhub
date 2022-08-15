import { FC } from 'common/types/types';
import { Image } from 'components/common/common';

import { getRandomColor } from './helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  keyName: string;
  name: string;
};

const Category: FC<Props> = ({ keyName, name }) => {
  return (
    <div className={styles.category} style={{ borderColor: getRandomColor() }}>
      <Image
        width="30px"
        height="30px"
        src={`/${keyName}.svg`}
        alt={`${keyName} img`}
        isCircular
      />

      <p className={styles.categoryName}>{name}</p>
    </div>
  );
};

export { Category };
