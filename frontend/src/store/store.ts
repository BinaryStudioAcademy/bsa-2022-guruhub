import { configureStore } from '@reduxjs/toolkit';

import { authApi, notification } from 'services/services';
import { errorHandler } from './middlewares/error-handler';
import { rootReducer } from './root-reducer';

const extraArgument = {
  authApi,
  notification,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: { extraArgument },
    }).concat(errorHandler);
  },
});

export { extraArgument, store };
