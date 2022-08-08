import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { NotificationType } from '~/common/enums/enums';
import { notify } from '~/store/auth/actions';

const notifyLogger: Middleware =
  ({ dispatch }: MiddlewareAPI | any) =>
  (next) =>
  (action) => {
    if (action.error) {
      dispatch(
        notify({ type: NotificationType.ERROR, message: action.error.message }),
      );
    }

    return next(action);
  };

export { notifyLogger };
