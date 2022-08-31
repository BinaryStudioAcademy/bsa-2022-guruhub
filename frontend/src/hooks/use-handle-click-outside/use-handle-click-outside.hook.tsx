import { useCallback } from 'hooks/hooks';

type UseHandleClickOutsideArgs = {
  onClose: () => void;
};

type UseHandleClickOutsideReturn = {
  handleOutsideClick: () => void;
  handleDisableContentContainerClick: (
    evt: React.MouseEvent | MouseEvent,
  ) => void;
};

const useHandleClickOutside = ({
  onClose,
}: UseHandleClickOutsideArgs): UseHandleClickOutsideReturn => {
  const handleOutsideClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleDisableContentContainerClick = useCallback(
    (evt: React.MouseEvent | MouseEvent) => {
      evt.stopPropagation();
    },
    [],
  );

  return {
    handleOutsideClick,
    handleDisableContentContainerClick,
  };
};

export { useHandleClickOutside };
