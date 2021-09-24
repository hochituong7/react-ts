import { call, put, takeLatest } from "@redux-saga/core/effects";
import cityApi from "api/cityApi";
import { City, listResponse } from "models";
import { cityActions } from "./citySlice";

function* fetchCityList(){
    try {
        const response: listResponse<City> = yield call(cityApi.getAll); //get data from API
        yield put(cityActions.fetchCityListSuccess(response));// dispatch qua action success
    } catch (error) {
        console.log("Failed to fetch city list");
        yield put(cityActions.fetchCityListFailed());// dispatch qua action failed
    }
}

export default function* citySaga(){
    yield takeLatest(cityActions.fetchCityList.type, fetchCityList);
}