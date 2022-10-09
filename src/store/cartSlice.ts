import { Product, ListParams, ListResponse, PaginationParams } from '@/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { toast } from "react-toastify";

export interface cartState {
  cartItems: Array<any>;
  cartTotalQuantity: number;
  cartTotalAmount: number
}

const initialState: cartState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};


// const productSlice = createSlice({
//   name: 'addToCart',
//   initialState,
//   reducers: {
    
//     fetchProductList(state, action: PayloadAction<ListParams>) {
//       // console.log('start fect product list');
//       state.loading = true;
//     },

//     fetchProductListSuccess(state, action: PayloadAction<ListResponse<Product>>) {
      
//       // console.log('product list: action.payload: ', action.payload);
//       state.list = action.payload.data;

//       // console.log('fect dataok: ', action.payload);
      
//       state.pagination = action.payload.pagination;
//       // console.log('fect dataok: ', state.list);
//       state.loading = false;
//     },

//     fetchProductListFailed(state) {
//       state.loading = false;
//     },

//     setFilter(state, action: PayloadAction<ListParams>) {

//       console.log('new filter product: ', action.payload);

//       state.filter = action.payload;
//     },

//     // setFilterWithDebounce(state, action: PayloadAction<ListProductParams>) {},
//   },
// });

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
        toast.info("Increased product quantity", {
          position: "bottom-left",
        });
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        toast.success("Product added to cart", {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.info("Decreased product quantity", {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );

        state.cartItems = nextCartItems;

        toast.error("Product removed from cart", {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.id !== cartItem.id
          );

          state.cartItems = nextCartItems;

          toast.error("Product removed from cart", {
            position: "bottom-left",
          });
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("Cart cleared", { position: "bottom-left" });
    },
  },
});


// Actions
export const cartActions = cartSlice.actions;

// Selectors


// Reducer
const cartReducer = cartSlice.reducer;
export default cartReducer;
