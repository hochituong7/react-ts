import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
//add saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import authReducer from 'features/auth/authSlice';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { history } from 'utils';
import dashboardReducer from 'features/dashboard/dashboardSlice';
import studentReducer from 'features/student/studentSlice';
const sagaMiddleware = createSagaMiddleware();
//add saga


const rootReducer = combineReducers({
  router: connectRouter(history), // sử dụng history của connectRouter
  counter: counterReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  student: studentReducer,
})

//khởi tạo middleware
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware(
  //   {
  //   thunk: true,
  //   // serializableCheck: false,
  //   // immutableCheck: false
  // }
  ).concat(sagaMiddleware, routerMiddleware(history)), //add thêm sagaMiddleware vào trong middleware của redux toolkit
});

//run saga
sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
