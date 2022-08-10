import { Middleware } from '@reduxjs/toolkit';
import { NotificationType } from 'common/enums/enums';
import { AppDispatch } from 'common/types/types';

import { notify } from '../../app/actions';

type HandleErrorParams = {
  dispatch: AppDispatch;
};

const handleError: Middleware =
  ({ dispatch }: HandleErrorParams) =>
  (next) =>
  (action): void => {
    if (action.error) {
      const { message } = action.error;
      dispatch(notify({ type: NotificationType.ERROR, message }));
    }

    return next(action);
  };

export { handleError };
