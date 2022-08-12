import { Image } from 'components/common/common';
import { ReactElement } from 'react';

import styles from './styles.module.scss';

type Props<Data extends string> = {
  img: Data;
  name: Data;
  textColor: Data;
  backgroundColor: Data;
  borderColor: Data;
};

const Category = <Data extends string>({
  img,
  name,
  textColor,
  backgroundColor,
  borderColor,
}: Props<Data>): ReactElement => {
  return (
    <div
      className={styles.category}
      style={{ borderColor, background: backgroundColor }}
    >
      <Image
        width={'30px'}
        height={'30px'}
        src={img}
        alt={`${name} category`}
        isCircular={true}
      />
      <p style={{ color: textColor }}>{name}</p>
    </div>
  );
};

export { Category };
