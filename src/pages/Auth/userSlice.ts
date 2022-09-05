import { UserDetail } from "@/models/user";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
    users: {
        usersDetail: UserDetail | null,
        isFetching: boolean,
        error: boolean
    },
    msg: string,
}

const initialState: UserState = {
    users: {
        usersDetail: null,
        isFetching: false,
        error: false
    },
    msg: ""
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        getUsersStart: (state)=>{
            state.users.isFetching = true;
        },
        getUsersSuccess: (state,action) =>{
            state.users.isFetching = false;
            state.users.usersDetail = action.payload;
        },
        getUsersFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
        deleteUserStart: (state)=>{
            state.users.isFetching = true;
        },
        deleteUsersSuccess: (state,action)=>{
            state.users.isFetching = false;
            state.msg = action.payload;
        },
        deleteUserFailed: (state,action)=>{
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        } 
    }
})

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailed,
    deleteUserStart,
    deleteUsersSuccess,
    deleteUserFailed
} = userSlice.actions;

// Selectors
export const selectUserDetail = (state: any) => state.users.usersDetail;


// Reducer
const userReducer = userSlice.reducer;
export default userReducer;