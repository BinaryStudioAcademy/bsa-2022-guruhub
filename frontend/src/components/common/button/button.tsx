import { FC } from 'common/types/types';

type Props = {
  label: string;
  type?: 'button' | 'submit';
  className?: string;
};

const Button: FC<Props> = ({ type = 'button', label, className }) => (
  <button type={type} className={className}>
    {label}
  </button>
);

export { Button };
