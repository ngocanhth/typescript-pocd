import { User } from '@/models/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoginPayload {
  username: string;
  password: string;
}

// export interface AuthState {
//   isLoggedIn: boolean;
//   logging?: boolean;
//   currentUser?: User;
// }

export interface AuthState {
    login:{
        currentUser: User,
        isFetching: boolean,
        isLoggedIn: boolean,
        error: boolean
    },
    register:{
        isFetching: boolean,
        error: boolean,
        success: boolean
    },
}

const initialState: AuthState = {
//   isLoggedIn: false,
//   logging: false,
//    currentUser: undefined,
    login:{
        currentUser:{
            id: '',
            first_name: '',
            last_name: '',
            access_token: '',
            refresh_token: '',
        },
        isLoggedIn: false,
        isFetching: false,
        error:false
    },
    register:{
        isFetching: false,
        error:false,
        success:false
    },

};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // login(state, action: PayloadAction<LoginPayload>) {
    //   state.logging = true;
    // },
    // loginSuccess(state, action: PayloadAction<User>) {
    //   state.isLoggedIn = true;
    //   state.logging = false;
    //   state.currentUser = action.payload;
    // },
    // loginFailed(state, action: PayloadAction<string>) {
    //   state.logging = false;
    // },

    // logout(state) {
    //   state.isLoggedIn = false;
    //   state.currentUser = undefined;
    // },

    loginStart: (state) =>{
        state.login.isFetching = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
        state.login.isFetching = false;
        state.login.currentUser = action.payload;
        state.login.isLoggedIn = true;
        state.login.error = false;
    },
    loginFailed: (state) =>{
        state.login.isFetching = false;
        state.login.error = true;
    },
    registerStart: (state) =>{
        state.register.isFetching = true;
    },
    registerSuccess: (state) => {
        state.register.isFetching = false;
        state.register.error = false;
        state.register.success = true;
    },
    registerFailed: (state) =>{
        state.register.isFetching = false;
        state.register.error = true;
        state.register.success = false;
    },
    logOutSuccess: (state) => {
        state.login.isFetching = false;
        // state.login.currentUser = null;
        state.login.error = false;
    },
    logOutFailed: (state) =>{
        state.login.isFetching = false;
        state.login.error = true;
    },
    logOutStart: (state) =>{
        state.login.isFetching = true;
    },
  },
});

// Actions

export const {
    loginStart,
    loginFailed,
    loginSuccess,
    registerStart,
    registerSuccess,
    registerFailed,
    logOutStart,
    logOutSuccess,
    logOutFailed
} = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: any) => state.auth.login.isLoggedIn;
export const selectIsLogging = (state: any) => state.auth.login.isFetching;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;



// const authSlice = createSlice({
//     name: "auth",
//     initialState:{
//         login:{
//             currentUser:null,
//             isFetching: false,
//             error:false
//         },
//         register:{
//             isFetching: false,
//             error:false,
//             success:false
//         },
//     },
//     reducers:{
//         loginStart: (state) =>{
//             state.login.isFetching = true;
//         },
//         loginSuccess: (state,action) => {
//             state.login.isFetching = false;
//             state.login.currentUser = action.payload;
//             state.login.error = false;
//         },
//         loginFailed: (state) =>{
//             state.login.isFetching = false;
//             state.login.error = true;
//         },
//         registerStart: (state) =>{
//             state.register.isFetching = true;
//         },
//         registerSuccess: (state) => {
//             state.register.isFetching = false;
//             state.register.error = false;
//             state.register.success = true;
//         },
//         registerFailed: (state) =>{
//             state.register.isFetching = false;
//             state.register.error = true;
//             state.register.success = false;
//         },
//         logOutSuccess: (state) => {
//             state.login.isFetching = false;
//             state.login.currentUser = null;
//             state.login.error = false;
//         },
//         logOutFailed: (state) =>{
//             state.login.isFetching = false;
//             state.login.error = true;
//         },
//         logOutStart: (state) =>{
//             state.login.isFetching = true;
//         },
     
//     }
// });

// export const {
//     loginStart,
//     loginFailed,
//     loginSuccess,
//     registerStart,
//     registerSuccess,
//     registerFailed,
//     logOutStart,
//     logOutSuccess,
//     logOutFailed
// } = authSlice.actions;