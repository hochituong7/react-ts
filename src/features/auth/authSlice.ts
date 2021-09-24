import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "models/user";

export interface AuthState{
    isLoggedIn: boolean;
    logging?: boolean;
    currentUser?: User;
}

export interface LoginPayload {
    username: string;
    password: string;
}

const initialState: AuthState = {
    isLoggedIn: false,
    logging: false,
    currentUser: undefined,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login(state,action: PayloadAction<LoginPayload>){
            state.logging = true;
        },
        loginSuccess(state, action: PayloadAction<User>){
            state.isLoggedIn = true;
            state.logging = false;
            state.currentUser = action.payload;
        },
        loginFail(state, action: PayloadAction<string>){
            state.logging = false;
        },
        logout(state){
            state.isLoggedIn = false;
            state.currentUser = undefined;
        }
    },
})
//redux-toolkit gom chung action, selectors, reducers
//Action
export const authActions = authSlice.actions;




//Selectors
export const selectIsLoggedIn = (state:any) => state.auth.isLoggedIn;
export const selectIsLogging = (state:any) => state.auth.logging;




//Reducer
const authReducer = authSlice.reducer;
export default authReducer;