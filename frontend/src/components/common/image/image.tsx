import { FC } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';

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
    className={getValidClasses(isCircular && styles.circular, styles.image)}
    width={width}
    height={height}
    src={src}
    alt={alt}
  />
);

export { Image };
