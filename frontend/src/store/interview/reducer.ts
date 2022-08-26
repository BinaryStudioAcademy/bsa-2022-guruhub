import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { InterviewsGetAllItemResponseDto } from 'common/types/types';

import { getInterview } from './actions';

type State = {
  dataStatus: DataStatus;
  interview: InterviewsGetAllItemResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  interview: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getInterview.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getInterview.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.interview = action.payload;
  });
  builder.addCase(getInterview.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
