import * as React from 'react';
import { useRouteMatch,Switch,Route } from 'react-router-dom';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';
import {useEffect} from 'react';
import { useAppDispatch } from 'app/hooks';
import { cityActions } from 'features/city/citySlice';
export default function StudentFeature () {

  const math = useRouteMatch(); //kế thừa lại connect router, k cần khai báo lại
  const dispatch = useAppDispatch();
  useEffect(()=> {
    dispatch(cityActions.fetchCityList());
  },[dispatch]);
  
  return (

      <Switch>
        <Route path={math.path} exact>
            <ListPage/>
        </Route>

        <Route path={`${math.path}/add`}>
            <AddEditPage />
        </Route>

        <Route path={`${math.path}/:studentId`}>
            <AddEditPage />
        </Route>

      </Switch>

  );
}
