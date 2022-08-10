import { RefObject, useEffect } from 'react';

type Parameters = {
  ref: RefObject<HTMLElement>;
  onClick: () => void;
};

const useHandleClickOutside = ({ ref, onClick }: Parameters): void => {
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
