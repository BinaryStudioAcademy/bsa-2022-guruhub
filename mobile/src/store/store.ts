import { configureStore } from '@reduxjs/toolkit';
import { authApi, notificationApi } from '~/services/services';
import { notifyLogger } from './middlewares/middlewares';
import { rootReducer } from './root-reducer';

const extraArgument = {
  authApi,
  notificationApi,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
    }).concat(notifyLogger);
  },
});

export { extraArgument, store };
