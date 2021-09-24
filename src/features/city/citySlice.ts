import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { City, listResponse } from "models";

export interface CityState {
    loading: boolean;
    list: City[];
}

const initialStateDefault: CityState = {
    loading: false,
    list: []
}

const citySlice = createSlice({
    name: 'city',
    initialState: initialStateDefault,
    reducers: {
        fetchCityList(state){
            state.loading = true;
        },
        fetchCityListSuccess(state, action: PayloadAction<listResponse<City>>){
            state.loading = true;
            state.list = action.payload.data;
        },
        fetchCityListFailed(state){
            state.loading = true;
        },
    },
})



//Action
export const cityActions = citySlice.actions;

//Selectors
export const selectCityList = (state: RootState) => state.city.list;

//Reducers
const cityReducer = citySlice.reducer;
export default cityReducer;