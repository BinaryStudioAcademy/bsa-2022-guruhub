import { AppRoute } from 'common/enums/enums';
import { FC, IconName } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';
import React, { ReactElement } from 'react';

import { Icon, Link } from '../common';
import styles from './styles.module.scss';

type Props = {
  label: string;
  hasVisuallyHiddenLabel?: boolean;
  btnColor?: 'blue' | 'gray' | 'red';
  type?: 'button' | 'submit';
  btnType?: 'filled' | 'outlined' | 'upload' | 'icon' | 'bottom';
  to?: AppRoute | null;
  onClick?: (evt: React.MouseEvent) => void;
  iconName?: IconName;
  iconColor?: 'blue' | 'gray';
  onFileSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const Button: FC<Props> = ({
  btnType = 'filled',
  hasVisuallyHiddenLabel = false,
  type = 'button',
  btnColor,
  label,
  to,
  onClick,
  iconName,
  iconColor = 'gray',
  onFileSelect,
  className,
}) => {
  const isLink = Boolean(to);
  const hasIcon = Boolean(iconName);

  const getContent = (): ReactElement | string => {
    return (
      <>
        {hasIcon && (
          <Icon
            name={iconName as IconName}
            className={styles[`icon-${iconColor}`]}
          />
        )}

        <span
          className={getValidClasses(
            hasVisuallyHiddenLabel && 'visually-hidden',
          )}
        >
          {label}
        </span>
      </>
    );
  };

  if (isLink) {
    return (
      <Link
        to={to as AppRoute}
        className={getValidClasses(
          styles.button,
          hasIcon && styles.iconButton,
          styles[`button-${btnColor}`],
          styles[`button-${btnType}`],
          className,
        )}
      >
        {getContent()}
      </Link>
    );
  }

  const isUploadButton = btnType === 'upload';

  if (isUploadButton) {
    return (
      <label
        className={getValidClasses(
          styles.button,
          styles[`button-${btnColor}`],
          styles[`button-${btnType}`],
          className,
        )}
      >
        <input
          type="file"
          onChange={onFileSelect}
          className="visually-hidden"
        />
        {label}
      </label>
    );
  }

  return (
    <button
      type={type}
      className={getValidClasses(
        styles.button,
        styles[`button-${btnColor}`],
        styles[`button-${btnType}`],
        className,
      )}
      onClick={onClick}
    >
      {getContent()}
    </button>
  );
};

export { Button, Props };
