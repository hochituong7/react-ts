import { call, put, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import studentApi from "api/studentApi";
import { ListParams, listResponse, Student } from "models";
import { studentActions } from "./studentSlice";

function* fetchStudentList(action: PayloadAction<ListParams>){
    try {
       const response: listResponse<Student> = yield call(studentApi.getAll,action.payload);
       yield put(studentActions.fetchStudentListSuccess(response))
    } catch (error) {
        console.log('Failed fetch student list');
        yield put(studentActions.fetchStudentListFailed(error))
    }
}


export default function* studentSaga(){
    yield takeLatest(studentActions.fetchStudentList,fetchStudentList);
}