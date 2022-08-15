import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';

import { Link } from '../common';
import styles from './styles.module.scss';

type Props = {
  label: string;
  btnColor?: 'blue' | 'gray';
  type?: 'button' | 'submit';
  hasInversedStyles?: boolean;
  to?: AppRoute;
  onClick?: () => void;
};

const Button: FC<Props> = ({
  hasInversedStyles = false,
  type = 'button',
  btnColor = 'blue',
  label,
  to,
  onClick,
}) => {
  const isLink = Boolean(to);

  if (isLink) {
    return (
      <Link
        to={to as AppRoute}
        className={getValidClasses(
          styles.button,
          hasInversedStyles && styles.inversedStyles,
        )}
      >
        {label}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={getValidClasses(
        styles.button,
        styles[`button-${btnColor}`],
        hasInversedStyles && styles.inversedStyles,
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export { Button };
