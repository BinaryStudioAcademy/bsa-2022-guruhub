import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { InterviewsGetOtherItemResponseDto } from 'common/types/types';

import { getOtherByInterviewId } from './actions';

type State = {
  dataStatus: DataStatus;
  otherInterviews: InterviewsGetOtherItemResponseDto[];
  totalOtherInterviews: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  otherInterviews: [],
  totalOtherInterviews: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getOtherByInterviewId.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getOtherByInterviewId.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.otherInterviews = payload.items;
    state.totalOtherInterviews = payload.total;
  });
  builder.addCase(getOtherByInterviewId.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.otherInterviews = [];
    state.totalOtherInterviews = 0;
  });
});

export { reducer };
