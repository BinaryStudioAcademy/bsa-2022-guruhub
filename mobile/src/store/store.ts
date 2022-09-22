import { configureStore } from '@reduxjs/toolkit';

import {
  authApi,
  billingApi,
  categoriesApi,
  chatApi,
  courseModulesApi,
  coursesApi,
  groupsApi,
  interviewsApi,
  mentorsApi,
  notification,
  permissionsApi,
  storage,
  tasksApi,
  userDetailsApi,
  usersApi,
} from '~/services/services';

import { handleError } from './middlewares/middlewares';
import { rootReducer } from './root-reducer';

const extraArgument = {
  authApi,
  billingApi,
  categoriesApi,
  chatApi,
  courseModulesApi,
  coursesApi,
  groupsApi,
  mentorsApi,
  notification,
  permissionsApi,
  storage,
  tasksApi,
  userDetailsApi,
  usersApi,
  interviewsApi,
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
