import type { Middleware } from '@reduxjs/toolkit';

import { NotificationType } from '~/common/enums/enums';
import { AppDispatch } from '~/common/types/types';
import { notify } from '~/store/app/actions';

type HandleErrorParams = {
  dispatch: AppDispatch;
};

const handleError: Middleware =
  ({ dispatch }: HandleErrorParams) =>
  (next) =>
  (action) => {
    if (action.error) {
      dispatch(
        notify({ type: NotificationType.ERROR, message: action.error.message }),
      );
    }

    return next(action);
  };

export { handleError };
