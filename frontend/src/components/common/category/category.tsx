import { StringCase } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Image } from 'components/common/common';
import { changeStringCase, getValidClasses } from 'helpers/helpers';

import { getRandomColor } from './helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  keyName: string;
  name: string;
  activeCategory?: string;
  onClick?: (keyName: string) => void;
};

const Category: FC<Props> = ({ keyName, name, activeCategory, onClick }) => {
  const keyNameKebabCase = changeStringCase({
    stringToChange: keyName,
    caseType: StringCase.KEBAB_CASE,
  });

  const handleClick = (): void => {
    onClick && onClick(keyName);
  };

  return (
    <button
      className={getValidClasses(
        styles.category,
        activeCategory === keyName && styles.selected,
      )}
      style={{ borderColor: getRandomColor() }}
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
