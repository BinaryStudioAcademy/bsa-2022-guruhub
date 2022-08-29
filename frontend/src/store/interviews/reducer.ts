import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { InterviewsGetAllItemResponseDto } from 'common/types/types';

import { getInterviews } from './actions';

type State = {
  dataStatus: DataStatus;
  interviews: InterviewsGetAllItemResponseDto[];
  totalInterviewsNumber: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  interviews: [],
  totalInterviewsNumber: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getInterviews.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getInterviews.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.interviews = payload.items;
    state.totalInterviewsNumber = payload.total;
  });
  builder.addCase(getInterviews.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
