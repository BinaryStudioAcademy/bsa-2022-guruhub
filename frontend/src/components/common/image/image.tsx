import { FC } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  width: string;
  height: string;
  src: string;
  alt: string;
  isCircular?: boolean;
  onClick?: () => void;
};

const Image: FC<Props> = ({ width, height, src, alt, isCircular, onClick }) => (
  <img
    className={getValidClasses(isCircular && styles.circular, styles.image)}
    width={width}
    height={height}
    src={src}
    alt={alt}
    onClick={onClick}
  />
);

export { Image };
