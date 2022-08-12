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

  return (
    <button
      type={type}
      className={getValidClasses(styles.button, styles[`button-${btnColor}`])}
      onClick={(): void => {
        to ? navigate(to) : onClick && onClick();
      }}
    >
      {label}
    </button>
  );
};

export { Button };
