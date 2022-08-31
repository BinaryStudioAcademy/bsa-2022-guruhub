import { StringCase } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Image } from 'components/common/common';
import { changeStringCase, getValidClasses } from 'helpers/helpers';
import { useMemo } from 'hooks/hooks';

import { getRandomColor } from './helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  keyName: string;
  name: string;
  isActive?: boolean;
  onClick?: (keyName: string) => void;
};

const Category: FC<Props> = ({ keyName, name, isActive, onClick }) => {
  const keyNameKebabCase = changeStringCase({
    stringToChange: keyName,
    caseType: StringCase.KEBAB_CASE,
  });

  const color = useMemo(() => {
    return getRandomColor();
  }, []);

  const handleClick = (): void => {
    onClick?.(keyName);
  };

  return (
    <button
      className={getValidClasses(styles.category, isActive && styles.selected)}
      style={{ borderColor: color }}
      onClick={handleClick}
    >
      <Image
        width="30px"
        height="30px"
        src={`/category-icons/${keyNameKebabCase}.svg`}
        alt={`${keyName} img`}
        isCircular
      />

      <p className={styles.categoryName}>{name}</p>
    </button>
  );
};

export { Category };
