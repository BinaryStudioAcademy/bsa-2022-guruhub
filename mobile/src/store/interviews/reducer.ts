import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import { InterviewsGetAllItemResponseDto } from '~/common/types/types';

import { getInterviews } from './actions';

type State = {
  interviewsDataStatus: DataStatus;
  interviews: InterviewsGetAllItemResponseDto[];
  interviewsTotalCount: number;
};

const initialState: State = {
  interviewsDataStatus: DataStatus.IDLE,
  interviews: [],
  interviewsTotalCount: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getInterviews.pending, (state) => {
    state.interviewsDataStatus = DataStatus.PENDING;
  });

  builder.addCase(getInterviews.fulfilled, (state, action) => {
    state.interviewsDataStatus = DataStatus.FULFILLED;
    state.interviews = action.payload.items;
    state.interviewsTotalCount = action.payload.total;
  });

  builder.addCase(getInterviews.rejected, (state) => {
    state.interviewsDataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
