import authSaga from 'features/auth/authSaga';
import counterSaga from 'features/counter/counterSaga';
import dashboardSaga from 'features/dashboard/dashboardSaga';
import studentSaga from 'features/student/studentSaga';
import {all} from 'redux-saga/effects';

// function* helloSaga(){
//     console.log('Hello saga')
// }
export default function* rootSaga() {
    console.log('Root saga');
    //chạy tất cả saga bằng all trong saga effects
    yield all([
        // helloSaga(),
        counterSaga(),
        authSaga(),
        dashboardSaga(),
        studentSaga(),
    ]);
}