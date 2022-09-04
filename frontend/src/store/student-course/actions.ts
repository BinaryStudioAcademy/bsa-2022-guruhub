import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  CourseModulesGetAllItemResponseDto,
  CourseModulesGetByCourseIdAndMenteeIdRequestDto,
} from 'common/types/types';

import { ActionType } from './common';

const getModulesByCourseIdAndMentorId = createAsyncThunk<
  CourseModulesGetAllItemResponseDto[],
  CourseModulesGetByCourseIdAndMenteeIdRequestDto,
  AsyncThunkConfig
>(
  ActionType.GET_MODULES_BY_COURSE_ID_AND_MENTEE_ID,
  async ({ courseId, menteeId }, { extra }) => {
    const { courseModulesApi } = extra;
    const modules = await courseModulesApi.getByCourseIdAndMenteeId({
      courseId,
      menteeId,
    });

    return modules;
  },
);

export { getModulesByCourseIdAndMentorId };
