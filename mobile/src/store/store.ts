import { configureStore } from '@reduxjs/toolkit';

import {
  authApi,
  categoriesApi,
  courseModulesApi,
  coursesApi,
  groupsApi,
  interviewersApi,
  mentorsApi,
  notification,
  permissionsApi,
  storage,
  usersApi,
} from '~/services/services';

import { handleError } from './middlewares/middlewares';
import { rootReducer } from './root-reducer';

const extraArgument = {
  authApi,
  categoriesApi,
  courseModulesApi,
  coursesApi,
  groupsApi,
  interviewersApi,
  mentorsApi,
  notification,
  permissionsApi,
  storage,
  usersApi,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
    }).concat(handleError);
  },
});

export { extraArgument, store };
