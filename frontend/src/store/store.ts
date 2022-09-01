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
  storage,
  userDetailsApi,
  usersApi,
} from 'services/services';

import { handleError } from './middlewares/middlewares';
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
