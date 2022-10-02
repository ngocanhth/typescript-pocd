import { Product, ListParams, ListResponse, PaginationParams } from '@/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export interface ProductState {
  loading: boolean;
  list: Product[];
  filter: ListParams;
  pagination: PaginationParams;
}

const initialState: ProductState = {
  loading: false,
  list: [],
  filter: {},
  pagination: {
    page: 1,
    limit: 9,
    totalRows: 9,
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    
    fetchProductList(state, action: PayloadAction<ListParams>) {
      console.log('start fect product list');
      state.loading = true;
    },

    fetchProductListSuccess(state, action: PayloadAction<ListResponse<Product>>) {
      
      console.log('product list: action.payload: ', action.payload);
      state.list = action.payload.data;

      console.log('fect dataok: ', action.payload);
      
      state.pagination = action.payload.pagination;
      // console.log('fect dataok: ', state.list);
      state.loading = false;
    },

    fetchProductListFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },

    // setFilterWithDebounce(state, action: PayloadAction<ListProductParams>) {},
  },
});

// Actions
export const productActions = productSlice.actions;

// Selectors
export const selectProductList = (state: RootState) => state.product.list;
export const selectProductLoading = (state: RootState) => state.product.loading;
export const selectProductFilter = (state: RootState) => state.product.filter;
export const selectProductPagination = (state: RootState) => state.product.pagination;

// Reducer
const productReducer = productSlice.reducer;
export default productReducer;
