import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';

import { Link } from '../common';
import styles from './styles.module.scss';

type Props = {
  label: string;
  btnColor?: 'blue' | 'gray';
  type?: 'button' | 'submit';
  inversedStyles?: boolean;
  to?: AppRoute;
  onClick?: () => void;
};

const Button: FC<Props> = ({
  type = 'button',
  inversedStyles = false,
  label,
  btnColor = 'blue',
  to,
  onClick,
}) => {
  const isLink = Boolean(to);

  if (isLink) {
    return (
      <Link
        to={to as AppRoute}
        className={
          inversedStyles
            ? getValidClasses(styles.button, styles.inversedStyles)
            : styles.button
        }
      >
        {label}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={getValidClasses(styles.button, styles[`button-${btnColor}`])}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export { Button };
