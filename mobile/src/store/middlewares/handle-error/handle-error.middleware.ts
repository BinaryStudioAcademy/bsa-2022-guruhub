import { type Middleware } from '@reduxjs/toolkit';

import { CustomExceptionName, NotificationType } from '~/common/enums/enums';
import { AppDispatch } from '~/common/types/types';
import { notify } from '~/store/app/actions';
import { signOut } from '~/store/auth/actions';

type HandleErrorParams = {
  dispatch: AppDispatch;
};

const handleError: Middleware =
  ({ dispatch }: HandleErrorParams) =>
  (next) =>
  (action) => {
    if (action.error) {
      const { name, message } = action.error;

      if (name === CustomExceptionName.INVALID_CREDENTIALS) {
        dispatch(signOut());
      } else {
        dispatch(notify({ type: NotificationType.ERROR, message: message }));
      }
    }

    return next(action);
  };

export { handleError };
