import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  CategoryGetAllItemResponseDto,
  CourseGetResponseDto,
  CourseModulesGetAllItemResponseDto,
  TaskWithModuleResponseDto,
  UsersGetResponseDto,
} from 'common/types/types';

import {
  changeMentor,
  checkIsMentor,
  chooseMentor,
  cleanMentees,
  cleanMentor,
  cleanMentors,
  createMentor,
  disableMentorBecoming,
  disableMentorChoosing,
  getActiveInterviewsCategoryIdsByUserId,
  getCategories,
  getCourse,
  getMenteesByCourseId,
  getMentor,
  getMentorsByCourseId,
  getModules,
  getPassedInterviewsCategoryIdsByUserId,
  getTasksByCourseIdAndMenteeId,
  updateCategory,
  updateIsMentorBecomingEnabled,
  updateIsMentorChoosingEnabled,
} from './actions';

type State = {
  dataStatus: DataStatus;
  course: CourseGetResponseDto | null;
  modules: CourseModulesGetAllItemResponseDto[];
  passedInterviewsCategoryIds: number[];
  activeInterviewsCategoryIds: number[];
  isMentorBecomingEnabled: boolean;
  isMentorChoosingEnabled: boolean;
  mentors: UsersGetResponseDto[];
  mentor: UsersGetResponseDto | null;
  categories: CategoryGetAllItemResponseDto[];
  menteesByCourseId: UsersGetResponseDto[];
  menteesByCourseDataStatus: DataStatus;
  isMentor: boolean;
  mentorCheckDataStatus: DataStatus;
  tasks: TaskWithModuleResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  course: null,
  modules: [],
  passedInterviewsCategoryIds: [],
  activeInterviewsCategoryIds: [],
  isMentorBecomingEnabled: false,
  isMentorChoosingEnabled: false,
  mentors: [],
  mentor: null,
  categories: [],
  menteesByCourseId: [],
  menteesByCourseDataStatus: DataStatus.IDLE,
  isMentor: false,
  mentorCheckDataStatus: DataStatus.IDLE,
  tasks: [],
};

const reducer = createReducer(initialState, (builder) => {
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
  builder.addCase(getModules.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getModules.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.modules = payload.items;
  });
  builder.addCase(getModules.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(
    getPassedInterviewsCategoryIdsByUserId.fulfilled,
    (state, { payload }) => {
      state.passedInterviewsCategoryIds = payload;
    },
  );
  builder.addCase(getPassedInterviewsCategoryIdsByUserId.rejected, (state) => {
    state.passedInterviewsCategoryIds = [];
  });
  builder.addCase(
    getActiveInterviewsCategoryIdsByUserId.fulfilled,
    (state, { payload }) => {
      state.activeInterviewsCategoryIds = payload;
    },
  );
  builder.addCase(getActiveInterviewsCategoryIdsByUserId.rejected, (state) => {
    state.activeInterviewsCategoryIds = [];
  });
  builder.addCase(
    updateIsMentorBecomingEnabled.fulfilled,
    (state, { payload }) => {
      state.isMentorBecomingEnabled = payload;
    },
  );

  builder.addCase(getMentorsByCourseId.fulfilled, (state, { payload }) => {
    state.mentors = payload;
  });
  builder.addCase(getMentorsByCourseId.rejected, (state) => {
    state.mentors = [];
  });

  builder.addCase(getCategories.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getCategories.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.categories = action.payload.items;
  });
  builder.addCase(getCategories.rejected, (state) => {
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

  builder.addCase(createMentor.fulfilled, (state) => {
    state.isMentorBecomingEnabled = false;
    state.isMentorChoosingEnabled = false;
  });

  builder.addCase(disableMentorBecoming.fulfilled, (state, { payload }) => {
    state.isMentorBecomingEnabled = payload;
  });

  builder.addCase(disableMentorChoosing, (state) => {
    state.isMentorChoosingEnabled = false;
  });

  builder.addCase(chooseMentor.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(chooseMentor.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.isMentorChoosingEnabled = false;
    state.isMentorBecomingEnabled = false;
    state.mentor = payload.mentor;
  });
  builder.addCase(chooseMentor.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(changeMentor.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });

  builder.addCase(changeMentor.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.isMentorChoosingEnabled = false;
    state.mentor = payload.mentor;
  });

  builder.addCase(getMentor.fulfilled, (state, { payload }) => {
    const hasMentor = Boolean(payload);
    const canChooseMentor = !hasMentor && state.isMentorChoosingEnabled;
    state.isMentorChoosingEnabled = canChooseMentor;
    state.mentor = payload ? payload.mentor : null;
  });

  builder.addCase(
    updateIsMentorChoosingEnabled.fulfilled,
    (state, { payload }) => {
      state.isMentorChoosingEnabled = payload;
    },
  );
  builder.addCase(getMenteesByCourseId.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
    state.menteesByCourseDataStatus = DataStatus.PENDING;
  });
  builder.addCase(getMenteesByCourseId.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.menteesByCourseId = payload;
    state.menteesByCourseDataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(getMenteesByCourseId.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.menteesByCourseDataStatus = DataStatus.REJECTED;
  });
  builder.addCase(checkIsMentor.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
    state.mentorCheckDataStatus = DataStatus.PENDING;
  });
  builder.addCase(checkIsMentor.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.isMentor = payload;
    state.mentorCheckDataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(checkIsMentor.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.mentorCheckDataStatus = DataStatus.REJECTED;
  });

  builder.addCase(cleanMentor, (state) => {
    state.mentor = null;
  });
  builder.addCase(cleanMentors, (state) => {
    state.mentors = [];
  });

  builder.addCase(cleanMentees, (state) => {
    state.menteesByCourseId = [];
    state.isMentor = false;
  });

  builder.addCase(getTasksByCourseIdAndMenteeId.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(
    getTasksByCourseIdAndMenteeId.fulfilled,
    (state, { payload }) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.tasks = payload;
    },
  );
  builder.addCase(getTasksByCourseIdAndMenteeId.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.tasks = [];
  });
});

export { reducer };
