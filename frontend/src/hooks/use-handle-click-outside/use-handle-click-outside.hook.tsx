import React, { RefObject, useEffect } from 'react';

type UseHandleClickOutsideArgs = {
  ref: RefObject<HTMLElement>;
  onClick: () => void;
};

const useHandleClickOutside = ({
  ref,
  onClick,
}: UseHandleClickOutsideArgs): void => {
  useEffect(() => {
    const handleClickOutside = (evt: React.MouseEvent | MouseEvent): void => {
      const hasCurrentNode = (evt.target as Node).contains(ref.current);
      const isCurrentNode = evt.target === ref.current;

      if (hasCurrentNode && !isCurrentNode) {
        onClick();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClick]);
};

export { useHandleClickOutside };
