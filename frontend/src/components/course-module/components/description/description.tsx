import { FC } from 'common/types/types';
import { sanitizeHTML } from 'helpers/helpers';

type Props = {
  description: string | undefined;
  className?: string;
};

const Description: FC<Props> = ({ description, className }) => {
  const sanitizedDescription = sanitizeHTML(description ?? '');

  return (
    <p
      dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      className={className}
    />
  );
};

export { Description };
