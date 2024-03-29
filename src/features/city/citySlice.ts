import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { City, listResponse } from 'models';

export interface CityState {
  loading: boolean;
  list: City[];
}

const initialStateDefault: CityState = {
  loading: false,
  list: [],
};

const citySlice = createSlice({
  name: 'city',
  initialState: initialStateDefault,
  reducers: {
    fetchCityList(state) {
      state.loading = true;
    },
    fetchCityListSuccess(state, action: PayloadAction<listResponse<City>>) {
      state.loading = true;
      state.list = action.payload.data;
    },
    fetchCityListFailed(state) {
      state.loading = true;
    },
  },
});

//Action
export const cityActions = citySlice.actions;

//Selectors
export const selectCityList = (state: RootState) => state.city.list;

//function reduce tao object, map list city về dạng [key: value]
export const selectCityMap = createSelector(selectCityList, (cityList) =>
  cityList.reduce((map: { [key: string]: City }, city) => {
    map[city.code] = city;
    return map;
  }, {})
);

export const selectCityOptions = createSelector(selectCityList, (cityList) =>
  cityList.map((city) => ({
    label: city.name,
    value: city.code,
  }))
);

//Reducers
const cityReducer = citySlice.reducer;
export default cityReducer;
