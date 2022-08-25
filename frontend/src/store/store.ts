import { configureStore } from '@reduxjs/toolkit';
import {
  authApi,
  categoriesApi,
  courseModulesApi,
  coursesApi,
  groupsApi,
  interviewApi,
  navigation,
  notification,
  permissionsApi,
  storage,
  userDetailsApi,
  usersApi,
} from 'services/services';

import { handleError } from './middlewares/middlewares';
import { rootReducer } from './root-reducer';

const extraArgument = {
  authApi,
  coursesApi,
  usersApi,
  groupsApi,
  interviewApi,
  storage,
  notification,
  userDetailsApi,
  navigation,
  permissionsApi,
  categoriesApi,
  courseModulesApi,
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
