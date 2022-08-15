import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { CategoryGetAllItemResponseDto } from 'common/types/types';

import { getCategories } from './actions';

type State = {
  dataStatus: DataStatus;
  categories: CategoryGetAllItemResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  categories: [],
};

const reducer = createReducer(initialState, (builder) => {
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
});

export { reducer };
