import { delay, put, takeEvery } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
//import { fetchCount } from "./counterAPI";
import { incrementBySaga, incrementBySagaSuccess } from "./counterSlice";


//mỗi lần actions đc dispatch thì làm hành động log ra
// export function* log(action: PayloadAction){
//     console.log('Log', action);
// }

// function * test(){
//     yield fetchCount(2); // trả về promise

//     yield call(fetchCount,2); //báo cho sagaMiddleware thực thi trả về js object
// }

export function* handleIncrementSaga(action: PayloadAction<number>){
    console.log('Waiting 2s', action);
    //wait 1s
    yield delay(1000)
    console.log('Waiting done -> dispatch action');
    //dispatch action success
    yield put(incrementBySagaSuccess(action.payload));
}


export default function* counterSaga(){
    console.log('Count saga')

    // listen all actions và trả về hàm log
    //yield takeEvery('*', log)

     // listen 1 actions và trả về hàm log
     //yield takeEvery('counter/increment', log)
    
     // listen 1 actions và trả về hàm log
    //  yield takeEvery(increment().type, log)


    //yield takeLatest(incrementBySaga.toString(), handleIncrementSaga)/
    yield takeEvery(incrementBySaga.toString(), handleIncrementSaga)
}
