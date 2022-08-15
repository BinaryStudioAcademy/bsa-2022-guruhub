import { FC } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  src: string;
  alt: string;
};

const SearchIcon: FC<Props> = ({ src, alt }) => (
  <img className={getValidClasses(styles.searchIcon)} src={src} alt={alt} />
);

export { SearchIcon };
