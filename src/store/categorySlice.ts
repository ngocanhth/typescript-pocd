import { Category, ListParams, ListResponse, PaginationParams } from '@/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export interface CategoryState {
  loading: boolean;
  list: Category[];
  filter: ListParams;
  pagination: PaginationParams;
}

const initialState: CategoryState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 15,
  },
  pagination: {
    _page: 1,
    _limit: 15,
    _totalRows: 15,
  },
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    fetchCategoryList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchCategoryListSuccess(state, action: PayloadAction<ListResponse<Category>>) {
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    fetchCategoryListFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },

    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
});

// Actions
export const studentActions = categorySlice.actions;

// Selectors
export const selectStudentList = (state: RootState) => state.student.list;
export const selectStudenLoading = (state: RootState) => state.student.loading;
export const selectStudentFilter = (state: RootState) => state.student.filter;
export const selectStudentPagination = (state: RootState) => state.student.pagination;

// Reducer
const studentReducer = studentSlice.reducer;
export default studentReducer;
