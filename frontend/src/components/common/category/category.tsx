import { StringCase } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Image } from 'components/common/common';
import { changeStringCase } from 'helpers/helpers';
import { useMemo } from 'hooks/hooks';

import { getRandomColor } from './helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  keyName: string;
  name: string;
};

const Category: FC<Props> = ({ keyName, name }) => {
  const keyNameKebabCase = changeStringCase({
    stringToChange: keyName,
    caseType: StringCase.KEBAB_CASE,
  });

  const color = useMemo(() => {
    return getRandomColor();
  }, []);

  return (
    <div className={styles.category} style={{ borderColor: color }}>
      <Image
        width="30px"
        height="30px"
        src={`/category-icons/${keyNameKebabCase}.svg`}
        alt={`${keyName} img`}
        isCircular
      />

      <p className={styles.categoryName}>{name}</p>
    </div>
  );
};

export { Category };
