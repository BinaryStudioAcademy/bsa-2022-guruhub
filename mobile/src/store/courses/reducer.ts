import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import {
  CourseGetResponseDto,
  UserDetailsResponseDto,
  UsersGetResponseDto,
} from '~/common/types/types';

import {
  addCourse,
  becomeMentor,
  checkIsMentor,
  chooseMentor,
  clearMentor,
  getCourse,
  getCourses,
  getMenteesByCourseId,
  getMenteesMentor,
  getMentorsByCourseId,
  setBecomeMentorInvisible,
  setCourse,
  updateCategory,
  updateisMentorChoosingEnabled,
  updateVisibilityBecomeMentor,
} from './actions';

type State = {
  dataStatus: DataStatus;
  dataBecomeMentorStatus: DataStatus;
  dataMentorStatus: DataStatus;
  courses: CourseGetResponseDto[];
  mentor: UsersGetResponseDto | null;
  mentors: UserDetailsResponseDto[];
  menteesByCourseId: UserDetailsResponseDto[];
  course: CourseGetResponseDto | null;
  isMentorBecomingVisible: boolean;
  isMentorChoosingEnabled: boolean;
  isMentor: boolean;
  totalCoursesNumber: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  dataBecomeMentorStatus: DataStatus.IDLE,
  dataMentorStatus: DataStatus.IDLE,
  courses: [],
  mentor: null,
  mentors: [],
  menteesByCourseId: [],
  course: null,
  isMentorBecomingVisible: false,
  isMentorChoosingEnabled: true,
  isMentor: false,
  totalCoursesNumber: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getCourses.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getCourses.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.courses = payload;
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

  builder.addCase(setCourse.fulfilled, (state, { payload }) => {
    state.course = payload;
  });

  builder.addCase(updateCategory.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(updateCategory.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.course = payload;
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

  builder.addCase(becomeMentor.pending, (state) => {
    state.dataBecomeMentorStatus = DataStatus.PENDING;
  });
  builder.addCase(becomeMentor.fulfilled, (state) => {
    state.dataBecomeMentorStatus = DataStatus.FULFILLED;
  });
  builder.addCase(becomeMentor.rejected, (state) => {
    state.dataBecomeMentorStatus = DataStatus.REJECTED;
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

  builder.addCase(getMenteesMentor.fulfilled, (state, { payload }) => {
    const hasMentor = Boolean(payload);
    const canChooseMentor = !hasMentor && state.isMentorChoosingEnabled;
    state.isMentorChoosingEnabled = canChooseMentor;
    state.mentor = payload ? payload.mentor : null;
  });

  builder.addCase(clearMentor, (state) => {
    state.mentor = null;
    state.isMentorChoosingEnabled = true;
  });

  builder.addCase(getMenteesByCourseId.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getMenteesByCourseId.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.menteesByCourseId = payload;
  });
  builder.addCase(getMenteesByCourseId.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(checkIsMentor.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(checkIsMentor.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.isMentor = payload;
  });
  builder.addCase(checkIsMentor.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
