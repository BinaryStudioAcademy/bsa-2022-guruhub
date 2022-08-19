import { RefObject, useEffect } from 'react';

type UseHandleClickOutsideArgs = {
  ref: RefObject<HTMLElement>;
  onClick: (e: React.MouseEvent) => void;
};

const useHandleClickOutside = ({
  ref,
  onClick,
}: UseHandleClickOutsideArgs): void => {
  useEffect(() => {
    const handleClickOutside = (e: React.MouseEvent | MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClick(e as React.MouseEvent);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClick]);
};

export { useHandleClickOutside };
