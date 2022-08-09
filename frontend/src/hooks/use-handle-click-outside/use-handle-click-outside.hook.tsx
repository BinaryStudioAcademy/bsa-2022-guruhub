import { useEffect, RefObject } from 'react';

const useHandleClickOutside = (
  ref: RefObject<HTMLElement>,
  onClick: () => void,
): void => {
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
