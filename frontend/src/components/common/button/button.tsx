import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';
import { useNavigate } from 'hooks/hooks';

import styles from './styles.module.scss';

type Props = {
  label: string;
  btnColor?: 'blue' | 'gray';
  type?: 'button' | 'submit';
  to?: AppRoute;
  onClick?: () => void;
};

const Button: FC<Props> = ({
  type = 'button',
  label,
  btnColor = 'blue',
  to,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleOnClick = (): void => {
    to ? navigate(to) : onClick && onClick();
  };

  return (
    <button
      type={type}
      className={getValidClasses(styles.button, styles[`button-${btnColor}`])}
      onClick={handleOnClick}
    >
      {label}
    </button>
  );
};

export { Button };
