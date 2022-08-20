import { type Middleware } from '@reduxjs/toolkit';

import { DataStatus, NotificationType } from '~/common/enums/enums';
import { AppDispatch } from '~/common/types/types';
import { notify } from '~/store/app/actions';
import { ActionType } from '~/store/auth/common';

type HandleErrorParams = {
  dispatch: AppDispatch;
};

const handleError: Middleware =
  ({ dispatch }: HandleErrorParams) =>
  (next) =>
  (action) => {
    if (
      action.error &&
      action.type !== `${ActionType.LOAD_CURRENT_USER}/${DataStatus.REJECTED}`
    ) {
      dispatch(
        notify({ type: NotificationType.ERROR, message: action.error.message }),
      );
    }

    return next(action);
  };

export { handleError };
