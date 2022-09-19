import { configureStore } from '@reduxjs/toolkit';
import {
  authApi,
  billingApi,
  categoriesApi,
  chatsApi,
  courseModulesApi,
  coursesApi,
  groupsApi,
  interviewsApi,
  mentorsApi,
  navigation,
  notification,
  permissionsApi,
  storage,
  tasksApi,
  userDetailsApi,
  usersApi,
} from 'services/services';

import { chatSocket, handleError } from './middlewares/middlewares';
import { rootReducer } from './root-reducer';

const extraArgument = {
  authApi,
  billingApi,
  chatsApi,
  coursesApi,
  usersApi,
  groupsApi,
  interviewsApi,
  storage,
  notification,
  userDetailsApi,
  navigation,
  permissionsApi,
  categoriesApi,
  courseModulesApi,
  mentorsApi,
  tasksApi,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: { extraArgument },
    }).concat([handleError, chatSocket]);
  },
});

export { extraArgument, store };
