import { FC } from 'common/types/types';

type Props = {
  label: string;
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
};

const Button: FC<Props> = ({
  type = 'button',
  label,
  className,
  disabled = false,
}) => (
  <button className={className} type={type} disabled={disabled}>
    {label}
  </button>
);

export { Button };
