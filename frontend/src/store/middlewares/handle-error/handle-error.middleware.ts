import { Middleware } from '@reduxjs/toolkit';
import { NotificationType } from 'common/enums/enums';
import { AppDispatch } from 'common/types/types';
import { appActions } from 'store/actions';

type HandleErrorParams = {
  dispatch: AppDispatch;
};

const handleError: Middleware =
  ({ dispatch }: HandleErrorParams) =>
  (next) =>
  (action): void => {
    if (action.error) {
      const { message } = action.error;
      dispatch(appActions.notify({ type: NotificationType.ERROR, message }));
    }

    return next(action);
  };

export { handleError };
