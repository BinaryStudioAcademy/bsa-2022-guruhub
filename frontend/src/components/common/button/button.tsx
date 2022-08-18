import { AppRoute } from 'common/enums/enums';
import { ButtonProps, FC, IconName } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';
import { ReactElement } from 'react';

import { Icon, Link } from '../common';
import styles from './styles.module.scss';

const Button: FC<ButtonProps> = ({
  btnType = 'filled',
  type = 'button',
  btnColor = 'blue',
  label,
  to,
  onClick,
  iconName,
}) => {
  const isLink = Boolean(to);

  const getContent = (): ReactElement | string => {
    const isIcon = Boolean(iconName);

    if (isIcon) {
      return (<Icon name={iconName as IconName} />) as ReactElement;
    }

    return label as string;
  };

  if (isLink) {
    return (
      <Link
        to={to as AppRoute}
        className={getValidClasses(
          btnType !== 'icon' && [styles.button, styles[`button-${btnType}`]],
        )}
      >
        {getContent()}
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
      {getContent()}
    </button>
  );
};

export { Button };
