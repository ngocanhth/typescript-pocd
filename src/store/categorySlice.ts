import { Category, ListCategoryParams, ListResponse } from '@/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export interface CategoryState {
  loading: boolean;
  list: Category[];
  filter: ListCategoryParams;
}

const initialState: CategoryState = {
  loading: false,
  list: [],
  filter: {
    slug: undefined
  }
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    
    fetchCategoryList(state, action: PayloadAction<ListCategoryParams>) {
      console.log('testok');

      state.loading = true;
    },
    fetchCategoryListSuccess(state, action: PayloadAction<ListResponse<Category>>) {
      
      // console.log('action.payload: ', action.payload);
      state.list = action.payload.data;
      // console.log('fect dataok: ', state.list);
      state.loading = false;
    },
    fetchCategoryListFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListCategoryParams>) {
      state.filter = action.payload;
    },

    // setFilterWithDebounce(state, action: PayloadAction<ListCategoryParams>) {},
  },
});

// Actions
export const categoryActions = categorySlice.actions;

// Selectors
export const selectCategoryList = (state: RootState) => state.category.list;
export const selectCategoryLoading = (state: RootState) => state.category.loading;
export const selectCategoryFilter = (state: RootState) => state.category.filter;

// Reducer
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
