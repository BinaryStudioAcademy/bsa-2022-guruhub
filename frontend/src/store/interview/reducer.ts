import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { InterviewsGetAllItemResponseDto } from 'common/types/types';

import { getInterviews } from './actions';

type State = {
  dataStatus: DataStatus;
  interviews: InterviewsGetAllItemResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  interviews: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getInterviews.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getInterviews.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.interviews = payload.items;
  });
});

export { reducer };
