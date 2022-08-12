import { Image } from 'components/common/common';
import { ReactElement } from 'react';

import { getRandomColor } from './helpers/helpers';
import styles from './styles.module.scss';

type Props<Data extends string> = {
  img: Data;
  name: Data;
};

const Category = <Data extends string>({
  img,
  name,
}: Props<Data>): ReactElement => {
  return (
    <div className={styles.category} style={{ borderColor: getRandomColor() }}>
      <Image
        width={'30px'}
        height={'30px'}
        src={img}
        alt={`${name} category`}
        isCircular={true}
      />
      <p>{name}</p>
    </div>
  );
};

export { Category };
