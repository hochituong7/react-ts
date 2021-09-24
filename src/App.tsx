import React,{useEffect} from 'react';
import cityApi from 'api/cityApi';
import {Switch,Route} from 'react-router-dom';
import LoginPage from 'features/auth/pages/LoginPage';
import { AdminLayout } from 'components/Layout';
import { NotFound, PrivateRoute } from 'components/Common';
import { useAppDispatch } from 'app/hooks';
import { Button } from '@material-ui/core';
import { authActions } from 'features/auth/authSlice';
function App() {
  return (
    <>
    
      <Switch>
        <Route path="/login">
          <LoginPage/>
        </Route>
        <PrivateRoute path="/admin">
         <AdminLayout/>
        </PrivateRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
