import { configureStore } from '@reduxjs/toolkit';
import {
  authApi,
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
  socket,
  storage,
  tasksApi,
  userDetailsApi,
  usersApi,
} from 'services/services';

import {
  handleError,
  socket as socketMiddleware,
} from './middlewares/middlewares';
import { rootReducer } from './root-reducer';

const extraArgument = {
  authApi,
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
  socket,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: { extraArgument },
    }).concat([handleError, socketMiddleware]);
  },
});

export { extraArgument, store };
