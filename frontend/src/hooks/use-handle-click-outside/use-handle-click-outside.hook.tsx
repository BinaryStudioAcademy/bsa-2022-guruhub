import React, { RefObject, useEffect } from 'react';

type UseHandleClickOutsideArgs = {
  ref: RefObject<HTMLElement>;
  onClick: (evt: React.MouseEvent) => void;
};

const useHandleClickOutside = ({
  ref,
  onClick,
}: UseHandleClickOutsideArgs): void => {
  useEffect(() => {
    const handleClickOutside = (evt: React.MouseEvent | MouseEvent): void => {
      if (ref.current && !ref.current.contains(evt.target as Node)) {
        onClick(evt as React.MouseEvent);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClick]);
};

export { useHandleClickOutside };
