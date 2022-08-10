import { RefObject, useEffect } from 'react';

type UseHandleClickOutsideArgs = {
  ref: RefObject<HTMLElement>;
  onClick: () => void;
};

const useHandleClickOutside = ({
  ref,
  onClick,
}: UseHandleClickOutsideArgs): void => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClick]);
};

export { useHandleClickOutside };
