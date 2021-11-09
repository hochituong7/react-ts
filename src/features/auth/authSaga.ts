import { call, delay, fork, put, take } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { authActions, LoginPayload } from "./authSlice";

function* handleLogin(payload: LoginPayload){
    try {
        console.log('Handle login', payload)
        yield delay(500)
        //yield call(api,...)
        localStorage.setItem('access_token','T358115794')

        //trả về hàm success
        yield put(
            authActions.loginSuccess({
                id: 1,
                name: 'admin'
            })
        );
        //redirect admin page
        yield put(push('/admin/dashboard')); // sử dụng connectRouterMiddleware
    } catch (error) {
        yield put(authActions.loginFail('Failed'));
    }
    
}
function* handleLogout(){
    localStorage.removeItem('access_token')
    //redirect login page
    yield put(push('/login')); // sử dụng connectRouterMiddleware
}
function* watchLoginFlow(){
    // always listen
    while(true){

        const isLoggedIn = Boolean(localStorage.getItem('access_token'));
        //chưa login mới lắng nhe dispatch login
        if(!isLoggedIn){
            // đợi user dispatch action login
            const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
            //then gọi handle login
            yield fork(handleLogin,action.payload);
        }
        

        //đợi user dispatch logout
        yield take(authActions.logout.type);
        //then gọi handle logout
        yield call(handleLogout); 
        // call => đợi , tránh trường hợp chưa xóa kịp access_token 
        //mà bấm login tiếp, thì vẫn còn token (thì ko vào hàm login nữa) nên sẽ nhảy qua lắng nge logout nên ko login đc
    }
   

}


export default function* authSaga(){
    yield fork(watchLoginFlow);


}