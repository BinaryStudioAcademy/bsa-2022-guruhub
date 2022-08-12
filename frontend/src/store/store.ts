import { configureStore } from '@reduxjs/toolkit';
import {
  authApi,
  groupsApi,
  notification,
  permissionsApi,
  storage,
  usersApi,
} from 'services/services';

import { handleError } from './middlewares/middlewares';
import { rootReducer } from './root-reducer';

const extraArgument = {
  authApi,
  usersApi,
  groupsApi,
  permissionsApi,
  storage,
  notification,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: { extraArgument },
    }).concat(handleError);
  },
});

export { extraArgument, store };
