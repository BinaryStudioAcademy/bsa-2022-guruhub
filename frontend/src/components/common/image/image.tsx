import clsx from 'clsx';
import { FC } from 'common/types/types';

import styles from './styles.module.scss';

type Props = {
  width: string;
  height: string;
  src: string;
  alt: string;
  isCircular?: boolean;
};

const Image: FC<Props> = ({ width, height, src, alt, isCircular }) => (
  <img
    className={clsx(isCircular && styles.circular)}
    width={width}
    height={height}
    src={src}
    alt={alt}
  />
);

export { Image };
