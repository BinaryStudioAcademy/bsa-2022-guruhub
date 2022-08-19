import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';

import { Link } from '../common';
import styles from './styles.module.scss';

type Props = {
  label: string;
  btnColor?: 'blue' | 'gray';
  type?: 'button' | 'submit';
  btnType?: 'filled' | 'outlined' | 'upload';
  to?: AppRoute;
  onClick?: () => void;
  classes?: string;
};

const Button: FC<Props> = ({
  btnType = 'filled',
  type = 'button',
  btnColor = 'blue',
  label,
  to,
  onClick,
  classes,
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
        classes,
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
