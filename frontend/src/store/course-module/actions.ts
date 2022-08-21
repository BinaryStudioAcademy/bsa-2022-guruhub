import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppRoute, NotificationMessage } from 'common/enums/enums';
import {
  AsyncThunkConfig,
  CourseModuleGetRequestParamsDto,
  CourseModuleGetResponseDto,
} from 'common/types/types';

import { ActionType } from './common';

const getById = createAsyncThunk<
  CourseModuleGetResponseDto,
  CourseModuleGetRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_BY_ID, async ({ courseId, moduleId }, { extra }) => {
  const { courseModulesApi, notification, navigation } = extra;
  const module = await courseModulesApi.getById({ courseId, moduleId });

  if (!module) {
    notification.error(NotificationMessage.MODULE_NOT_FOUND);
    navigation.push(`${AppRoute.COURSES}/${courseId}` as AppRoute);
  }

  return module;
});

export { getById };
