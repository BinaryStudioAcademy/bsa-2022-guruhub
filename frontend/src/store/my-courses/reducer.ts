import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  CourseGetMentoringDto,
  CourseGetResponseDto,
} from 'common/types/types';

import {
  getCoursesMentoring,
  getCoursesStudying,
  updateCoursesMentoring,
} from './actions';

type State = {
  dataStatus: DataStatus;
  coursesStudying: CourseGetResponseDto[];
  coursesMentoring: CourseGetMentoringDto[];
  totalCoursesMentoring: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  coursesStudying: [],
  coursesMentoring: [],
  totalCoursesMentoring: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getCoursesStudying.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getCoursesStudying.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.coursesStudying = payload;
  });
  builder.addCase(getCoursesStudying.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(getCoursesMentoring.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getCoursesMentoring.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.coursesMentoring = payload.items;
    state.totalCoursesMentoring = payload.total;
  });
  builder.addCase(getCoursesMentoring.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(updateCoursesMentoring.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    const foundIndex = state.coursesMentoring.findIndex(
      (course) => course.id === payload.courseId,
    );
    const courseToUpdate = state.coursesMentoring[foundIndex];
    state.coursesMentoring[foundIndex] = {
      ...courseToUpdate,
      maxStudentsCount: payload.maxStudentsCount,
    };
  });
  builder.addCase(updateCoursesMentoring.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
