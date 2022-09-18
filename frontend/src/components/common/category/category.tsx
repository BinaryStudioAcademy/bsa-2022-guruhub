import { StringCase } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Image } from 'components/common/common';
import { changeStringCase, getValidClasses } from 'helpers/helpers';
import { useMemo } from 'hooks/hooks';

import { getRandomColorClassName } from './helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  keyName: string;
  name: string;
  isActive?: boolean;
  onClick?: (keyName: string) => void;
};

const Category: FC<Props> = ({ keyName, name, isActive, onClick }) => {
  const isInteractive = Boolean(onClick);

  const keyNameKebabCase = changeStringCase({
    stringToChange: keyName,
    caseType: StringCase.KEBAB_CASE,
  });

  const colorClassName = useMemo(() => {
    return getRandomColorClassName();
  }, []);

  const handleClick = (): void => {
    onClick?.(keyName);
  };

  if (!isInteractive) {
    return (
      <span
        className={getValidClasses(styles.categorySpan, styles[colorClassName])}
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
      </span>
    );
  }

  return (
    <button
      className={getValidClasses(
        styles.category,
        styles[colorClassName],
        isActive && styles.selected,
      )}
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
