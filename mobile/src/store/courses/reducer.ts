import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import {
  CourseGetResponseDto,
  UserDetailsResponseDto,
} from '~/common/types/types';

import {
  addCourse,
  becomeMentor,
  getCourse,
  getCourses,
  getMentorsByCourseId,
  setBecomeMentorInvisible,
  updateVisibilityBecomeMentor,
  updateCategory,
} from './actions';

type State = {
  dataStatus: DataStatus;
  dataBecomeMentorStatus: DataStatus;
  courses: CourseGetResponseDto[];
  mentors: UserDetailsResponseDto[];
  course: CourseGetResponseDto | null;
  isMentorBecomingVisible: boolean;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  dataBecomeMentorStatus: DataStatus.IDLE,
  courses: [],
  mentors: [],
  course: null,
  isMentorBecomingVisible: false,
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
  builder.addCase(
    updateVisibilityBecomeMentor.fulfilled,
    (state, { payload }) => {
      state.isMentorBecomingVisible = payload;
    },
  );
  builder.addCase(setBecomeMentorInvisible.fulfilled, (state, { payload }) => {
    state.isMentorBecomingVisible = payload;
  });
  builder.addCase(getMentorsByCourseId.fulfilled, (state, { payload }) => {
    state.mentors = payload;
  });
  builder.addCase(getMentorsByCourseId.rejected, (state) => {
    state.mentors = [];
  });
  builder.addCase(becomeMentor.pending, (state) => {
    state.dataBecomeMentorStatus = DataStatus.PENDING;
  });
  builder.addCase(becomeMentor.fulfilled, (state) => {
    state.dataBecomeMentorStatus = DataStatus.FULFILLED;
  });
  builder.addCase(becomeMentor.rejected, (state) => {
    state.dataBecomeMentorStatus = DataStatus.REJECTED;
  });
});

export { reducer };
