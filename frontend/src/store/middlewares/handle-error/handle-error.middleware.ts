import { Middleware } from '@reduxjs/toolkit';
import { notification } from 'services/services';

const handleError: Middleware =
  () =>
  (next) =>
  (action): void => {
    if (action.error) {
      const { message } = action.error;
      notification.error(message);
    }

    return next(action);
  };

export { handleError };
