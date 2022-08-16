import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';

import { Link } from '../common';
import styles from './styles.module.scss';

type Props = {
  label: string;
  btnColor?: 'blue' | 'gray';
  type?: 'button' | 'submit';
  btnType?: 'filled' | 'outlined';
  to?: AppRoute;
  onClick?: () => void;
};

const Button: FC<Props> = ({
  btnType = 'filled',
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
        className={getValidClasses(styles.button, styles[`button-${btnType}`])}
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
        styles[`button-${btnType}`],
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export { Button };
