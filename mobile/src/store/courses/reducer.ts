import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import {
  CourseGetResponseDto,
  UserDetailsResponseDto,
} from '~/common/types/types';

import {
  addCourse,
  chooseMentor,
  getCourse,
  getCourses,
  getMentorsByCourseId,
  updateCategory,
  updateisMentorChoosingEnabled,
} from './actions';

type State = {
  dataStatus: DataStatus;
  courses: CourseGetResponseDto[];
  course: CourseGetResponseDto | null;
  mentors: UserDetailsResponseDto[];
  isMentorChoosingEnabled: boolean;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  courses: [],
  course: null,
  mentors: [],
  isMentorChoosingEnabled: true,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getCourses.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getCourses.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.courses = action.payload;
  });
  builder.addCase(getCourses.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(getCourse.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getCourse.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.course = payload;
  });
  builder.addCase(getCourse.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(addCourse.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(addCourse.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(addCourse.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(updateCategory.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(updateCategory.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.course = action.payload;
  });
  builder.addCase(updateCategory.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(getMentorsByCourseId.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getMentorsByCourseId.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.mentors = payload;
  });
  builder.addCase(getMentorsByCourseId.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.mentors = [];
  });

  builder.addCase(chooseMentor.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.isMentorChoosingEnabled = false;
  });

  builder.addCase(updateisMentorChoosingEnabled.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(
    updateisMentorChoosingEnabled.fulfilled,
    (state, { payload }) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.isMentorChoosingEnabled = payload;
    },
  );
});

export { reducer };
