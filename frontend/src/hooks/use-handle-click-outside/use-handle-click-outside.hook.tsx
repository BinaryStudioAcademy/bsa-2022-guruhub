import { RefObject, useEffect } from 'react';

type Parameters = {
  ref: RefObject<HTMLElement>;
  onClick: () => void;
  ignoredElement?: RefObject<HTMLElement>;
};

const useHandleClickOutside = ({
  ref,
  onClick,
  ignoredElement,
}: Parameters): void => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        (!ignoredElement ||
          !ignoredElement.current ||
          !ignoredElement.current.contains(e.target as Node))
      ) {
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
