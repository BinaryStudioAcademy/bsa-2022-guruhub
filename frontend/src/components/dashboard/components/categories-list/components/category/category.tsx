import { StringCase } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Image } from 'components/common/common';
import { changeStringCase, getValidClasses } from 'helpers/helpers';

import { getRandomColor } from './helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  keyName: string;
  name: string;
  activeCategory: string;
  handleClick: (evt: React.MouseEvent) => void;
};

const Category: FC<Props> = ({
  keyName,
  name,
  activeCategory,
  handleClick,
}) => {
  const keyNameKebabCase = changeStringCase({
    stringToChange: keyName,
    caseType: StringCase.KEBAB_CASE,
  });

  return (
    <button
      id={keyName}
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
