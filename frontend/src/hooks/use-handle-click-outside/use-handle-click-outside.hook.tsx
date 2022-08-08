import { useEffect, RefObject } from 'react';

const useHandleClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: () => void,
): void => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
};

export { useHandleClickOutside };
